import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'


// https://cloudinary.com/documentation/react_integration#getting_started_guide
class Images extends Component {
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
    })


  }
  render(){
    return(
      <div>
        Images Component
        <Dropzone onDrop={this.uploadFile.bind(this)} />
      </div>
    )
  }
}

export default Images
