import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { Router } from "expo-router";


export default function CrearCurso(){

    const [nombre, setNombre] = useState('');
    const [image, setImage] = useState(''); 

    const handleSubmit = async () =>{

        if (!nombre.trim() || !image.trim()) {
            alert("Por favor complete todos los campos antes de continuar.");
            return;
          }
          
        const url = "https://lecodearnback.onrender.com/curso"; 
        console.log("something")

        try{

           
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                  "Content-Type":"application/json"  
                },
                body: JSON.stringify({nombre, image})
            });

            

            if (response.ok){

                response.json().then((data)=>{
                    console.log(data)
                    alert("Curso creado correctamente")
                })
            } else{
                alert("El curso no pudo ser agregado")
                const errorData = await response.json();
                console.log(errorData); 
            }

        } catch(error){
           console.log(error); 
        }

        
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style = {styles.container}>
            <Text style = {styles.title}>Crear curso ! 💻 🎓</Text>

        <View style = {styles.foro}>

            <View style={styles.seccionado}>
            <Text style ={styles.text}>Ingrese el nombre del Curso</Text>
            <TextInput 
            style= {styles.input}
            value = {nombre}
            onChangeText={setNombre}
            />
            </View>
            
            <View style={styles.seccionado}>
            <Text style ={styles.text}>Ingrese la imagen pricipal para el curso en formato de url</Text>
            <TextInput 
            style= {styles.input}
            value = {image}
            onChangeText={setImage}
            />
            </View>
           
            <Pressable onPress={handleSubmit} style={styles.button}>
           <Text style ={styles.textButton}>Crear curso</Text>
         </Pressable>

         <Text>{nombre}</Text>
        </View>

     <View style ={styles.finalSeccion}>
        <Text style = {styles.title2}> Comienza a añadir modulos</Text>
        <Link href={"/administrador/CrearModulo"}>
        <Pressable style={styles.button}>
           <Text style ={styles.textButton2}>Agregar modulo</Text>
         </Pressable>
         </Link>
         </View>


        </ScrollView>
        </SafeAreaView>
    );

}; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginTop:60,
        flex:1,  
    },

    seccionado:{
        backgroundColor: '#f0f8ff',
        borderRadius: 20,
        flex:1,
        alignItems: 'center',
        width:'90%',
        padding:20,
        marginTop:10,
        marginBottom:20,
        // iOS shadow
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,

      // Android shadow
      elevation: 6,
        },

    button:{
     backgroundColor: '#4169e1',
     padding: 20,
     borderRadius: 60,
     marginTop:20,
     borderColor: '#483d8b',
     alignItems:'center',
     maxWidth:'100%'

    },

    

    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#4169e1',
        marginBottom: 10,
      },

    title2: {
        fontSize: 24,
        fontWeight: '600',
        color: '#4169e1',
        marginBottom: 10,
        marginTop:30
      },


    foro:{
        backgroundColor: '#b0c4de',
        padding: 20,
        borderRadius: 20,
        marginTop:20,
        flex:1,
        alignItems:'center'
    },

    text:{
        fontSize: 20,
        fontWeight: '600',
        color: '#696969',
        marginBottom: 20,

    
    },

    textButton:{
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    
    },

    textButton2:{
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    
    },

    input: {
        borderColor: '#483d8b',
        borderWidth: 1,
        borderRadius: 30,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        width: '90%'
      },

      finalSeccion:{
        alignItems:'center'
      }
})

