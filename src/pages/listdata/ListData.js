import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios'
import CardView from 'react-native-cardview'


const ListData = ({navigation}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    },[]);

    

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
                                <TouchableOpacity>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nama Lengkap : {mahasiswa.nama}</Text>
                                </TouchableOpacity>
                                <Text>Alamat Lengkap : {mahasiswa.alamat}</Text>
                                <Text>Jurusan Lengkap: {mahasiswa.jurusan}</Text>
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

