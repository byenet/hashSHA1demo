import React, { Component } from 'react';
import axios  from "axios";
import SHA1 from "../Service/SHA1"

export default class Testfile extends Component {
  // componentDidMount() {
  //   localStorage.removeItem("checksum");
  // }

  constructor(props) {
    super(props);
    this.state = {
      file: {},
      checksum: "",
      click: false,
      select: "Text",
      txt: ''
    };
  }

  fileUpload(file) {
    // localStorage.removeItem("checksum");
    const url = "http://localhost:8081/uploadfile";
    const formData = new FormData();
    formData.append("file", file);
    axios({
      url: url,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        // localStorage.setItem("checksum", JSON.stringify(res.data));
        this.setState({
          checksum: res.data,
        });

        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          checksum: "File không đúng định dạng không xử lý được!",
        });
      });
  }

  // handleCheckText() => {

  // }

  handleChange = (e) => {
    let target = e.target;
    if (target.name === "file") {
      this.setState(
        {
          file: e.target.files[0],
          click: !this.state.click,
        },
        () => {
          console.log(this.state);
          console.log(this.state.file.name);
        }
      );
    } else if (target.name === "select") {
      this.setState({
        select: e.target.value,
      });
    } else if (target.name === "textInput"){
      this.setState({
        txt: e.target.value
      })
    }
    // console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.select === "File") {
      this.fileUpload(this.state.file);
    } else if (this.state.select === "Text") {
      let checked = SHA1(this.state.txt);
      this.setState({ 
        checksum: checked
      })
    }
  };

  handleSubmitText = () => {
    return (
      <textarea
        id="input"
        placeholder="Input"
        name="textInput"
        value={this.state.txt}
        onChange={this.handleChange}
      ></textarea>
    );
  };

  handleSubmitFile = () => {
    return (
      <div className="input">
        <div id="droppable-zone">
          <div id="droppable-zone-wrapper">
            <div id="droppable-zone-text">
              {this.state.file.name ? this.state.file.name : "Drop File Here"}
            </div>
          </div>
          <input
            id="input"
            type="file"
            placeholder="Input2"
            className="droppable-file"
            name="file"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  };

  render() {
    // console.log(this.state.select);
    // console.log(this.state.txt);
    // let fileName = JSON.parse(localStorage.getItem("fileName"));
    // let checksumLocal = JSON.parse(localStorage.getItem("checksum"));
    return (
      <div className="container">
        <div id="main" style={{ marginLeft: "270px" }}>
          <form onSubmit={this.handleSubmit}>
            <h1>SHA1 {this.state.select} Checksum</h1>
            <div className="description">
              SHA1 online hash {this.state.select.toLowerCase()} checksum function
            </div>
            <select
              id="input-type"
              name="select"
              className="my-2"
              onChange={this.handleChange}
            >
              <option selected value="Text">
                Text
              </option>
              <option value="File">File</option>
            </select>
            {this.state.select === 'Text'?this.handleSubmitText():this.handleSubmitFile() } 
            {/* {this.handleSubmitFile()} */}
            {/* {this.handleSubmitText()} */}
            <div className="submit">
              <input
                id="execute"
                type="submit"
                defaultValue="Hash"
                className="btn btn-default"
              />
            </div>

            <div className="output">
              <textarea
                id="output"
                placeholder="Output"
                value={this.state.checksum}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}






{/* <div class="input">
  <textarea id="input" placeholder="Input"></textarea>
  <div class="option-block">
    <label for="input-type">Input type</label>
    <select id="input-type">
      <option value="text">Text</option>
      <option value="hex">Hex</option>
    </select>
  </div>
</div>; */}