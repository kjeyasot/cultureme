import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as script from '../scripts';
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export class Upload extends React.Component {
    constructor(){
      super()
      this.state = {
        user: null,
        // user: firebase.auth().currentUser.uid,
        // user: null,
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
      const img = storage.ref().child(this.state.user.uid).child(key)
    //   img.put(this.state.file).then((snap) => {
    //         storage.ref(img).child(img.name).getDownloadURL().then(url => {
        
    //     console.log(url);
    //     console.log(img)
    //     this.setState({url});
    
    // WORKING FOR DB
    img.put(this.state.file).then((snap) => {
        // console.log('test'+ snap.metadata.downloadURLs)
        storage.ref(this.state.user.uid).child(img.name).getDownloadURL().then(url => {
        database.ref().child('Photos').child(this.state.user.uid).child(key).set({
          "url" : url
        })
      })
      })

      // img.put(this.state.file).then((snap) => {
      //     storage.ref(img).child(img.name).getDownloadURL().then(url => {
      //       console.log(url);
      //       console.log(img)
      //       // this.setState({url});
      //   })
      // })
      
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
      storage.ref().child(uid).child(img).delete()
      database.ref().child(uid).child(img).remove()
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
            
      const ref = database.ref().child('Photos').child(this.state.user.uid)
    // const ref = this.state.user.uid;
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
        maxHeight: "150px",
        maxWidth: "150px"
      }
      const imgStyle = {
        maxHeight: "150px",
        maxWidth: "150px",
        paddingRight: "20px",
        paddingBottom: "20px"
      }

      return (
        <div>
            <div>
            <h1>Step 2</h1>
            <h2>Upload Photos of Recent Work</h2>
            {this.state.user ?
            <div>
            {this.state.user.uid}</div>: null

        }
          </div>

        <div>
        <img 
        src="https://cdn.pixabay.com/photo/2017/01/18/17/39/cloud-computing-1990405__340.png"
        alt="Cloud"
        height = "200"
        width = "250"
        alignItems = "middle"
        />
      </div>
        
      <div>
         <img alt="sideImage" src={images['cool.png']} style={{float:'right'}}/>
      </div>
          
        <div class = "upload-btn-wrapper" >
          <input class = "btn" id="input" type="file" multiple onChange={this.handleChange}/>
        </div>
        <h3>Image Preview</h3>
        <div>
        <img src= {'https://impacttheory.com/wp-content/uploads/2018/11/placeholder.png'||this.state.url} height="300" width="400" />
        </div>
        <br></br>
        <button class = "btn" onClick={this.storePhoto} >Upload</button>
   
        <br></br>
        <h2>Uploaded Images</h2>
        {this.state.images.map((image) =>
            <div key={image.key}>
            {/* <h1>{image.file}</h1> */}
              <img src={image.url} style={imgStyle}/>
              <button class = "btn2" onClick={this.deletePhoto} 
                 name={image.key}>Remove</button>
            </div>
          )}
           </div>
      );
    }
  }
