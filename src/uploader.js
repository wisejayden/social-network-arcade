import React from 'react';
import axios from './axios';



export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
        this.setFieldValue = this.setFieldValue.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

    }
    setFieldValue(e) {


        this[e.target.name] = e.target.files[0];
        this.uploadImage();



    }

    uploadImage() {
        var formData = new FormData();
        formData.append('file', this.file);
        formData.append('id', this.props.user.id);


        axios.post('/upload-image', formData)
            .then((res) => {
                this.props.updateImage(res.data.file_url);
            })
            .catch(() => {
                console.log("no response");
            })
    }
    render() {

        return(
            <div>
                <div className="uploadermodal">
                    <button style={this.props.background} onClick={this.props.showUploader} id="closemenu">X</button>
                    <label className="custom-file-upload">Upload
                        <input id="fileupload" type="file" name="file" size="200" onChange={this.setFieldValue} />
                    </label>
                </div>
            </div>
        )

    }
}
//
// <label className="custom-file-upload">
