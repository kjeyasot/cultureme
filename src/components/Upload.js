import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';

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
      const key = database.ref().child(this.state.user.uid).push().key
      const img = storage.ref().child(this.state.user.uid).child(key)
    //   img.put(this.state.file).then((snap) => {
    //         storage.ref(img).child(img.name).getDownloadURL().then(url => {
        
    //     console.log(url);
    //     console.log(img)
    //     this.setState({url});
    
    // WORKING FOR DB
    img.put(this.state.file).then((snap) => {
        console.log('test'+ snap.metadata.downloadURLs)
        database.ref().child(this.state.user.uid).child(key).set({
          "url" : 'letssee'
        })
      })

    //   img.put(this.state.file).then((snap) => {
    //       storage.ref(img).child(img.name).getDownloadURL().then(url => {
    //         console.log(url);
    //         console.log(img)
    //         // this.setState({url});
    //     })
    //   })
      
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
            
      const ref = database.ref().child(this.state.user.uid)
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
        maxHeight: "100px",
        maxWidth: "100px"
      }
      const imgStyle = {
        maxHeight: "400px",
        maxWidth: "400px"
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
          <input id="input" type="file" multiple onChange={this.handleChange}/>
          <img src={this.state.url} style={previewStyle}/>
          <button onClick={this.storePhoto}>upload</button>
          {this.state.images.map((image) =>
            <div key={image.key}>
            <h1>{image.file}</h1>
            <progress value={this.state.progress} max="100"/>
              {/* <img src={this.state.url} style={imgStyle}/> */}
              <button onClick={this.deletePhoto} 
                 name={image.key}>remove</button>
            </div>
          )}
        </div>
      );
    }
  }
