import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios'
import CardView from 'react-native-cardview'


const ListData = ({navigation}) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    
    useEffect(() => {
        getData();
    },[]);

    const gotoDetail = (item) => {
         setSelectedUser(item);
        navigation.navigate("Detail Data",  {
            itemId: item.id,
            itemNama: item.nama,
            itemAlamat: item.alamat,
            itemJurusan : item.jurusan,
            itemImage : item.image
          });
    }

    

    const getData = () => {
        axios.get("http://192.168.43.91/CI-tes/api/mahasiswas/")
        .then(res => {
            const mahasiswa= res.data.data;
            console.log("tes : "+JSON.stringify(res.data.data));
            setUsers(mahasiswa);
        })
        .catch(function (error) {
            alert(error)
            console.log(error);
          });
    }

    const deleteItem = (item) => {
        console.log(item)
        axios.delete(`http://192.168.43.91/CI-tes/api/mahasiswas/delete/${item.id}`)
        .then(function (response) {
          alert(JSON.stringify(response))
          getData();
        })
        .catch(function (error) {
          alert(error)
          console.log(error);
        });
    }

    return (
        <ScrollView>
             {users.map((mahasiswa, i) => {
                return (
                        <CardView
                            cardElevation={2}
                            cardMaxElevation={2}
                            cornerRadius={5}
                            margin={10}>
                            <View style={styles.itemContainer}>
                            <Image
                            style={{width: 100, height: 100, marginLeft: 20, marginTop:10}}
                            source={{uri: `http://192.168.43.91/CI-tes/uploads/${mahasiswa.image}`}}/>
                            <View style={styles.desc}>
                                <TouchableOpacity onPress={() => gotoDetail(mahasiswa)}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nama Lengkap : {mahasiswa.nama}</Text>
                                </TouchableOpacity>
                                <Text>Alamat Lengkap : {mahasiswa.alamat}</Text>
                                <Text>Jurusan Lengkap: {mahasiswa.jurusan}</Text>
                               
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => Alert.alert('Peringatan', 'Apakah anda ingin menghapus data ini?', 
                        [
                            {
                                text: "Tidak", onPress: () => console.log("Button Tidak")
                            },
                            {
                                text: "Ya", onPress: () => deleteItem(mahasiswa)
                            },
                        ])}>
                            <Text style={styles.delete}>X</Text>

                            </TouchableOpacity>
                                </View>
                        </View>
                    </CardView>
                       )
                })}
                </ScrollView>
          )
        }
  

export default ListData;

const styles = StyleSheet.create({
    btnSimpan:{
        backgroundColor: 'lightblue',
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
      }
})

