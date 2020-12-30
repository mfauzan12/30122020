import React, {useState, PureComponent} from 'react';
import {View, Text, TextInput, TouchableHighlight,Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import axios from 'axios'

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const options = {
  title: 'konsepKoding',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};

const TambahData = ({navigation}) => {
    this.state = {
      avatarSource: null,
      pic: null,
    };
        const [id, setId] =useState("");
        const [nama, setNama] =useState("");
        const [alamat, setAlamat] =useState("");
        const [jurusan, setJurusan] =useState("");
    


        const GoTo = () => {
            navigation.navigate("List Data");
        }

////////////////////////////////////////////////////////////////////////////////
        myfun = () => {
          //alert('clicked');
      
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('Image Picker Error: ', response.error);
            } else {
              let source = {uri: response.uri};
      
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
              this.setState({
                avatarSource: source,
                pic: response.data,
              });
            }
          });
        };
        uploadPic = () => {
          // IP Adreess dan letak file up
          RNFetchBlob.fetch(
            'POST',
            'http://192.168.43.166/server/upload.php',
            {
              Authorization: 'Bearer access-token',
              otherHeader: 'foo',
              'Content-Type': 'multipart/form-data',
            },
            [
              // name: image adalah nama properti dari api kita
              {name: 'image', filename: 'tempbody.jpg', data: this.state.pic},
            ],
          ).then((resp) => {
            console.log('Response Saya');
            console.log(resp.data);
            alert('your image uploaded successfully');
            this.setState({avatarSource: null});
          });
        };
      
///////////////////////////////////////////////////////////////////////

        const simpan  =() => {
            const data = new FormData();
            data.append('nama', nama);
            data.append('alamat', alamat);
            data.append('jurusan', jurusan);
            axios.post("http://192.168.43.14/backend_CRUD_ReactNative/api/mahasiswas/tambah", data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                    .then(function (response) {
                      alert(JSON.stringify(response))
                      setNama("");
                      setAlamat("");
                      setJurusan("");
                    })
                    .catch(function (error) {
                      alert(error)
                      console.log(error);
                    });
        }

    return (
        <View>
                <Text style={{textAlign: 'center', margin: 10}}> Form Input Mahasiswa</Text>
                <TextInput placeholder="Masukkan Nama" style={{borderWidth: 1, marginBottom: 5}} value={nama} onChangeText={(value) => setNama(value)}></TextInput>
                <TextInput placeholder="Masukkan alamat" style={{borderWidth: 1, marginBottom: 5}}value={alamat} onChangeText={(value) => setAlamat(value)}></TextInput>
                <TextInput placeholder="Masukkan Jurusan" style={{borderWidth: 1, marginBottom: 5}}value={jurusan} onChangeText={(value) => setJurusan(value)}></TextInput>


                <Image
          source={this.state.avatarSource}
          style={{width: '100%', height: 300, margin: 10}}
        />

        <TouchableOpacity
          style={{backgroundColor: 'orange', margin: 10, padding: 10}}
          onPress={this.myfun}>
          <Text style={{color: '#fff'}}>Pilih Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.uploadPic}>
          <Text>Upload</Text>
        </TouchableOpacity>



                <TouchableHighlight onPress={simpan} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >Simpan</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={GoTo} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >Lihat Data</Text>
                </TouchableHighlight>

        </View>
    )
}

export default TambahData;

const styles = StyleSheet.create({
    btnSimpan:{
        backgroundColor: 'lightblue',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
      },
      textBtn : {
        fontSize :20,
        color : 'white'
      },
      delete : {
          fontSize: 20,
          fontWeight : 'bold',
          color : 'red',
          marginRight:10
      },
      itemContainer : {
          flexDirection:'row',
          marginBottom:20
      },
      desc : {
          marginLeft:18,
          flex:1
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
})