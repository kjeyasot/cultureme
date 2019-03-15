import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';


import * as script from '../scripts';
const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));


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
        paddingRight: "15px",
        paddingBottom:"20px",
      }

      return (
        <div>

          <navstuff.navstuff/>
      
      <div class = "moveElements">
        <div>
            <div>
            <h5 style={{ fontSize: "2vmax",fontFamily:"Arial"}}>Step 2: Upload Photos of Recent Work</h5>
            {/* {this.state.user ?
            <div>
            {this.state.user.uid}</div>: null
        } */}
        <br></br>
        </div>
        <div>
         <img className = "CoolGyalUpload" alt="sideImage" src={images['cool.png']}/>
      </div>

    
          <input className = "btnupload" id="input" type="file" onChange={this.handleChange}/>
          <br></br>
          <br></br>
          <div>
          <img className="imageUploadSize" src={this.state.url ||'http://via.placeholder.com/400x300'}/>

          </div>
          <br></br>
          <div class="upload-btn-wrapper">
          <button className = "btnupload" onClick={this.storePhoto}>Upload</button>
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
          <br></br>
          {/* <div className="text-right py-4 mt-3"> */}
          <MDBBtn className="btn btn-pink" type="submit">
                Done
                <MDBIcon far icon="check" className="ml-2 fas fa-angle-right" />
          </MDBBtn>
          {/* </div> */}
          <br></br>
          <br></br>
          </div>
        </div>
    </div>
    {/* <div className="spfooter"> */}
        <footer1.footer1/>
        {/* </div> */}
    </div>
      );
    }
  }
