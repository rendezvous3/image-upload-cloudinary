import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'


// https://cloudinary.com/documentation/react_integration#getting_started_guide
class Images extends Component {

  constructor(){
    super()
    this.state = {
      images: []
    }
  }


  uploadFile(files){
    console.log('uploading file: ')
    const image = files[0]

    const cloudName = 'mintx'
    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

    const timestamp = Date.now()/1000
    const uploadPreset = 'ximkyplu'

    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'NAPv5MpIapzXrqVk8oEd-s4JV7Q' // API Secret

    const signature = sha1(paramsStr)

    const params = {
      'api_key': '482883873665149',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    let uploadRequest = superagent.post(url)
    uploadRequest.attach('file', image)

    Object.keys(params).forEach((key)=> {
      uploadRequest.field(key, params[key])
    })

    uploadRequest.end((err, resp)=>{
      if(err){
        alert(err,null)
        return
      }

      console.log('UPLOAD COMPLETE:', JSON.stringify(resp.body))

      const uploaded = resp.body

      let updatedImages = Object.assign([], this.state.images)
      updatedImages.push(uploaded)

      this.setState({
        images: updatedImages
      })
    })

  }

  removeImage(event){
    event.preventDefault()
    console.log('removing image', event.target.id)

    let updatedImages = Object.assign([], this.state.images)
    updatedImages.splice(event.target.id, 1)

    this.setState({
      images: updatedImages
    })
  }
  render(){

    const list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <img style={{ width: 55 + 'px' }}  src={image.secure_url} />
          <br />
          <a id={i} onClick={this.removeImage.bind(this)} href="#">remove</a>
        </li>
      )
    })

    return(
      <div>
        Images Component
        <Dropzone onDrop={this.uploadFile.bind(this)} />
        <ul>
          { list }
        </ul>
      </div>
    )
  }
}

export default Images
