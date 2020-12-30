import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {ListData, TambahData, DetailData, EditData} from '../pages/pages'

const Stackk = createStackNavigator();

const Routes = () => {
    return (
       <Stackk.Navigator>
           <Stackk.Screen name="Tambah Data" component={TambahData}></Stackk.Screen>
           <Stackk.Screen name="List Data" component={ListData}></Stackk.Screen>
           <Stackk.Screen name="Detail Data" component={DetailData}></Stackk.Screen>
           <Stackk.Screen name="Edit Data" component={EditData}></Stackk.Screen>
       </Stackk.Navigator>
    );
}

export default Routes;