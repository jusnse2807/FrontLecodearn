import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import {Picker} from '@react-native-picker/picker';
import { Modulo } from "@/src/types";
import { FlatList } from "react-native";

export default function CrearModulo(){

    const [titulo, setTitulo] = useState('');
    const [numero, setNumero] = useState(''); 
    const [cursoId, setCursoId] = useState('');
   

    const [cursos, setCursos] =useState<any[]>([]);
    const [modulos, setModulos] = useState<any[]>([]);

    useEffect(()=>{

        const fetchEvents = async ()=>{

            const url = "https://lecodearnback.onrender.com/curso"; 
    
            try{
    
                const response = await fetch(url);
                
                if(response.ok){
                    const data = await response.json();
                    console.log(data)
                    
                    const formattedCourses = data.map((event:any)=>({
                        id: event.id,
                        nombre: event.nombre
                    }
                    ));
    
                    setCursos(formattedCourses); 
                }
            }catch(error){
                    console.error('Error fetching the courses')
            }
        }

        fetchEvents();

    }, []);

    const fetchModulos = async (idCurso: string)=>{

        console.log(cursoId)

        const url = `https://lecodearnback.onrender.com/modulo/curso/${idCurso}`; 

        try{
            console.log(cursoId)
            const response = await fetch(url);
            
            if(response.ok){
                const data = await response.json();
                console.log(data)
                console.log("Lo estas haciendo bien")
                
                const formattedModules = data.map((event:any)=>({
                    id: event.id,
                    titulo: event.titulo,
                    numero: event.numero
                }
                ));

                setModulos(formattedModules); 
            }
        }catch(error){
                console.error('Error fetching the courses')
        }
    }


    const handleSubmit = async () =>{

        if (!titulo.trim() || !numero.trim() || !cursoId.trim()) {
            alert("Por favor complete todos los campos antes de continuar.");
            return;
          }
          
        const url = "https://lecodearnback.onrender.com/modulo"; 

        try{
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                  "Content-Type":"application/json"  
                },
                body: JSON.stringify({titulo, numero, cursoId})
            });

            if (response.ok){

                response.json().then((data)=>{
                    console.log(data)
                    alert("Modulo creado correctamente")
                })
            } else{
                alert("El modulo no pudo ser agregado")
                const errorData = await response.json();
                console.log(errorData); 
            }

        } catch(error){
           console.log(error); 
        }
    };

    const renderModulos = ({item}: {item: Modulo})=>(
       <View>
        <Text>{item.numero}. {item.titulo}</Text>
       </View>
      
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style = {styles.container}>
            <Text style = {styles.title}>Crear un modulo !</Text>

        <View style = {styles.foro}>

            <Text style ={styles.text}>Ingrese el curso al que va a añadir el modulo</Text>
            <Picker
            selectedValue={cursoId}
            onValueChange={
                (itemValue) =>{
                    console.log(itemValue)
                    setCursoId(itemValue)
                    console.log("porque no imprime")
                    console.log(cursoId)
                    if (itemValue) {
                     fetchModulos(itemValue); 
                      }
                }}
            
            >
                <Picker.Item style = {styles.pickerContainer} label="Sleccione un curso ..." value=""/>
                {cursos.map((curso)=>(
                    <Picker.Item style = {styles.text} key = {curso.id} label ={curso.nombre} value = {curso.id}/>
                ))}

            </Picker>

             <View style ={styles.renderedView}>
            <Text style ={styles.tituloLista} >Ver modulos existentes en este curso</Text>
            <FlatList
            data={modulos}
            renderItem={renderModulos}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            columnWrapperStyle={{ gap: 10 }}
            >

            </FlatList>
            </View>

            <Text style ={styles.text}>Ingrese el titulo del modulo</Text>
            <TextInput 
            style= {styles.input}
            value = {titulo}
            onChangeText={setTitulo}
            />
            <Text style ={styles.text}>Ingrese el numero del modulo</Text>
            <TextInput 
            style= {styles.input}
            value = {numero}
            onChangeText={setNumero}
            />
           
            <Pressable onPress={handleSubmit} style={styles.button}>
           <Text style ={styles.textButton}>Crear modulo</Text>
         </Pressable>

        </View>
         
         <View style={styles.finalSeccion}>
        <Text style = {styles.title2}> Comienza a añadir secciones</Text>
        <Link href={'/administrador/CrearSeccion'} asChild>
        <Pressable style={styles.button}>
           <Text style ={styles.textButton2}>Agregar seccion</Text>
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

    button:{
     backgroundColor: '#4169e1',
     padding: 20,
     borderRadius: 60,
     marginTop:40,
     borderColor: '#483d8b',
     alignItems:'center',
     maxWidth:'80%'

    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: '#6495ed',
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
      },
      
      picker: {
        height: 100,
        width: '100%',
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
        backgroundColor: '#f0f8ff',
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
        marginTop:40
    
    },

    tituloLista: {
        fontSize: 20,
        fontWeight: '600',
        color: '#696969',
        marginBottom: 20

    },

    textButton:{
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
    
    },

    textButton2:{
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    
    },

    input: {
        borderColor: '#6495ed',
        borderWidth: 1,
        borderRadius: 30,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        width: '90%'
      },

      renderedItem:{
        flex:2,
        alignItems:'center'
      },

      renderedView:{
        backgroundColor: '#a9a9a9',
        maxWidth:'90%',
        padding:15,
        borderRadius:20,
        marginTop:20,
      },

      finalSeccion:{
        alignItems:'center'
      }
})

