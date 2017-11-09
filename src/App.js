import React, { Component } from 'react';
import './App.css';


class App extends Component {
    componentDidMount(){
        let _CANVAS = document.querySelector("#video-canvas"),
            _CTX = _CANVAS.getContext("2d"),
            _VIDEO = document.querySelector("#main-video");

        // Upon click this should should trigger click on the #file-to-upload file input element
        // This is better than showing the not-good-looking file input element
        document.querySelector("#upload-button").addEventListener('click', function() {
            document.querySelector("#file-to-upload").click();
        });

        // When user chooses a MP4 file
        document.querySelector("#file-to-upload").addEventListener('change', function() {
            // Validate whether MP4
            if(['video/mp4'].indexOf(document.querySelector("#file-to-upload").files[0].type) == -1) {
                alert('Error : Only MP4 format allowed');
                return;
            }

            // Hide upload button
            document.querySelector("#upload-button").style.display = 'none';

            // Object Url as the video source
            document.querySelector("#main-video source").setAttribute('src', URL.createObjectURL(document.querySelector("#file-to-upload").files[0]));
            
            // Load the video and show it
            _VIDEO.load();
            _VIDEO.style.display = 'none';
            
            // Load metadata of the video to get video duration and dimensions
            _VIDEO.addEventListener('loadedmetadata', function() { 
                console.log(_VIDEO.duration);
                let video_duration = _VIDEO.duration,duration_options_html = '';
                _VIDEO.currentTime = video_duration/2;
                _VIDEO.style.display = 'inline';
                setTimeout(function(){
                    // Set canvas dimensions same as video dimensions
                    _CANVAS.width = _VIDEO.videoWidth/2;
                    _CANVAS.height = _VIDEO.videoHeight/2;
                    _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth/2, _VIDEO.videoHeight/2);
                    console.log(_CANVAS.toDataURL());
                    document.querySelector("#get-thumbnail").style.display = 'inline';
                }, 500);
            });
        });
        // On clicking the Download button set the video in the canvas and download the base-64 encoded image data
        document.querySelector("#get-thumbnail").addEventListener('click', function() {
            document.querySelector("#get-thumbnail").setAttribute('href', _CANVAS.toDataURL());
            document.querySelector("#get-thumbnail").setAttribute('download', 'thumbnail.png');
        });
    }
    render() {
        return (<div className="App">
            <header className="App-header">
              <h1 className="App-title">Load Thumb from a selecting video Javascript</h1>
            </header>

            <div id="video-demo-container">
                <button id="upload-button">Select MP4 Video</button> 
                <input type="file" id="file-to-upload" accept="video/mp4" />
                <video id="main-video" controls="false" >
                    <source type="video/mp4"/>
                </video>
                <canvas id="video-canvas"></canvas>
                <a id="get-thumbnail" href="#">Download Thumbnail</a>
            </div>
        </div>);
    }
}

export default App;