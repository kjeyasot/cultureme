import React, {Component} from 'react';
import {storage} from '../firebase';

export class imageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
    });
  }
  render() {
    const style = {
      height: '100vh',
      //display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '200px'
      };
    return (
      <div style={style}>
        <h1 style={{color: 'grey'}}>STEP 2</h1>
        <h2>Upload Photos of Recent Work</h2>
        <img 
        src="https://cdn.pixabay.com/photo/2017/01/18/17/39/cloud-computing-1990405__340.png"
        alt="Cloud"
        height = "200"
        width = "250"
        alignItems = "middle"
        />
        <progress value={this.state.progress} max="100"/>
        <br></br>
        <br></br>

        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
        <br></br>
        <br></br>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
      </div>
    );
  }
}

// export default ImageUpload;