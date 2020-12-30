import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";

const DetailData = ({ route, navigation }) => {
    const { itemId, itemNama, itemAlamat, itemJurusan, itemImage } = route.params;
  const [id, setId] = useState(itemId)
  const [nama, setNama] = useState(itemNama);
  const [alamat, setAlamat] = useState(itemJurusan);
  const [jurusan, setJurusan] = useState(itemAlamat);
  const [imagePicture, setimagePicture] = useState(`http://192.168.43.14/backend_CRUD_ReactNative/uploads/${itemImage}`);
  const [users, setUsers] = useState([]);
  
  return (
    <View>
      <Text style={{ textAlign: "center", margin: 10 }}>  
        Detail Mahasiswa
      </Text>
  <Text style={{ textAlign: "left", margin: 10 }} key={id}>id : {id}</Text>
                <Text style={{ textAlign: "left", margin: 10 }}> Nama : {nama}</Text>
                <Text style={{ textAlign: "left", margin: 10 }}>Jurusan : {jurusan}</Text>
                <Text style={{ textAlign: "left", margin: 10 }}>Alamat : {alamat}</Text>
                <View style={{flexDirection: 'row'}}>
                <Text style={{ textAlign: "left", margin: 10 }}>Foto </Text>
                <Image
                style={{margin:10, width: 100, height: 100, marginLeft: 20, marginTop:10}}
                source={{uri: imagePicture}} />

                </View>
     
    </View>
  );
};

export default DetailData;

const styles = StyleSheet.create({
  btnSimpan: {
    backgroundColor: "lightblue",
    padding: 10,
    alignItems: "center"
  },
  textBtn: {
    fontSize: 20,
    color: "white"
  },
  delete: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginRight: 10
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  desc: {
    marginLeft: 18,
    flex: 1
  }
});
