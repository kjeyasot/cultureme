import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';


import * as script from '../scripts';
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));


export class Upload extends React.Component {
    constructor(){
      super()
      this.state = {
        user: null,
        file: null,
        url: [],
        images: []
      }

      this.handleChange = this.handleChange.bind(this)
      this.storePhoto = this.storePhoto.bind(this)
      this.deletePhoto = this.deletePhoto.bind(this)
    }

    
    handleChange(e) {
      this.setState({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
    storePhoto() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
      const key = database.ref().child('Photos').child(this.state.user.uid).push().key
      const img = storage.ref().child('Images').child(this.state.user.uid).child(key)
    
    // WORKING FOR DB
    img.put(this.state.file).then((snap) => {
        // console.log('test'+ snap.metadata.downloadURLs)
        storage.ref().child('Images').child(this.state.user.uid).child(img.name).getDownloadURL().then(url => {
        database.ref().child('Photos').child(this.state.user.uid).child(key).set({
          "url" : url
        })
      })
      })
      
      this.setState({
        file: null,
        url: null,
      })
    }
})
}


    deletePhoto(event) {
      let uid = this.state.user.uid
      let img = event.target.name
      storage.ref().child('Images').child(uid).child(img).delete()
      database.ref().child('Photos').child(this.state.user.uid).child(img).remove()

    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
      
      const ref = database.ref().child('Photos').child(this.state.user.uid)
      ref.on('child_added', (child) => {
        let images = this.state.images.slice()
        images.push({
          key: child.key,
          url: child.val().url
        })
        this.setState({images})
      })
      ref.on('child_removed', (child) => {
        let images = this.state.images.filter((image) => {
          return image.url != child.val().url
        })
        this.setState({images})
      })
    } 
});
    }
    render() {
      const previewStyle = {
        maxHeight: "100px",
        maxWidth: "100px",
        float:'right'
      }
      const imgStyle = {
        maxHeight: "150px",
        maxWidth: "150px",
        float:'middle',
        paddingRight: "15px"
      }

      return (
      <div class = "moveElements">
        <div>
            <div>
            <h1 style={{float:'middle', fontFamily:"Arial"}}>Step 2</h1>
            <h2 style={{float:'middle', fontFamily:"Arial"}}>Upload Photos of Recent Work</h2>
            {this.state.user ?
            <div>
            {this.state.user.uid}</div>: null
        }
        </div>
        <div>
         <img alt="sideImage" src={images['cool.png']} style={{float:'right', paddingRight: '350px', paddingBotton: '150px'}}/>
      </div>
          <input className = "btn" id="input" type="file" multiple onChange={this.handleChange}/>
          <br></br>
          <div>
          <img src={this.state.url ||'http://via.placeholder.com/400x300'}height="350px" width="550px" style={{float:'center', paddingRight: '200px'}}/>

          </div>
          <br></br>
          <div class="upload-btn-wrapper">
          <button className = "btn" onClick={this.storePhoto}>Upload</button>
          </div>

          {this.state.images.map((image) =>
            <div key={image.key}>
            <h1>{image.file}</h1>
            <div class="row">
                <div class="column">
              <img src={image.url} style={imgStyle}/>
              <button className = "removeButton" onClick={this.deletePhoto} 
                 name={image.key}>X</button>

                             </div>
              </div>
            </div>
          )}
          <div>
          <button className = "doneButton" style={{float:'center'}}>Done</button>
          </div>
        </div>
    </div>
      );
    }
  }
