import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import {Picker} from '@react-native-picker/picker';
import { FlatList } from "react-native";
import { Seccion } from "@/src/types";

export default function CrearModulo(){

    const [numero, setNumero] = useState('');
    const [titulo, setTitulo] = useState('');
    const [teoria, setTeoria] = useState('');
    const [ejemplo, setEjemplo] = useState('');
    const [moduloId, setModuloId] = useState('');
   
    const [cursoId, setCursoId] = useState('');

    const [cursos, setCursos] =useState<any[]>([]);
    const [modulos, setModulos] = useState<any[]>([]);
    const [secciones, setSecciones] = useState<any[]>([])

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

        const url = `https://lecodearnback.onrender.com/modulo/curso/${idCurso}`; 

        try{
            console.log(cursoId)
            const response = await fetch(url);
            
            if(response.ok){
                const data = await response.json();
                console.log(data)
                
                const formattedModules = data.map((event:any)=>({
                    id: event.id,
                    titulo: event.titulo,
                    number: event.number
                }
                ));

                setModulos(formattedModules); 
            }
        }catch(error){
                console.error('Error fetching the modulos')
        }
    }

    const fetchSecciones = async (idModulo: string)=>{

        const url = `https://lecodearnback.onrender.com/seccion/modulo/${idModulo}`; 

        try{

            const response = await fetch(url);
            
            if(response.ok){
                const data = await response.json();
                console.log(data)
                
                const formattedSecciones = data.map((event:any)=>({
                    id: event.id,
                    titulo: event.titulo,
                    numero: event.numero,
                    teoria: event.teoria,
                    ejemplo: event.ejempplo
                }
                ));

                setSecciones(formattedSecciones);
            }
        }catch(error){
                console.error('Error fetching the secciones')
        }
    }


    const handleSubmit = async () =>{

        if (!titulo.trim() || !numero.trim() || !moduloId.trim() || !teoria.trim() || !ejemplo.trim) {
            alert("Por favor complete todos los campos antes de continuar.");
            return;
          }
          
        const url = "https://lecodearnback.onrender.com/seccion"; 

        try{
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                  "Content-Type":"application/json"  
                },
                body: JSON.stringify({numero, titulo, teoria, ejemplo, moduloId})
            });

            if (response.ok){

                response.json().then((data)=>{
                    console.log(data)
                    alert("Seccion creada correctamente")
                })
            } else{
                alert("La seccion no pudo ser agregada")
                const errorData = await response.json();
                console.log(errorData); 
            }

        } catch(error){
           console.log(error); 
        }
    };

    const renderSecciones = ({item}: {item: Seccion})=>(
       <View>
        <Text>{item.numero}. {item.titulo}</Text>
       </View>
      
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style = {styles.container}>
            <Text style = {styles.title}>Crear una seccion !</Text>

        <View style = {styles.foro}>

            <Text style ={styles.text}>Ingrese el curso al que va a añadir la seccion</Text>
            <Picker
            selectedValue={cursoId}
            onValueChange={
                (itemValue) =>{
                    setCursoId(itemValue)
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

            <Text style ={styles.text}>Ingrese el modulo al que va a añadir la seccion</Text>
            <Picker
            selectedValue={moduloId}
            onValueChange={
                (itemValue) =>{
                    console.log(itemValue)
                    setModuloId(itemValue)
                    if (itemValue) {
                     fetchSecciones(itemValue); 
                      }
                }}
            
            >
                <Picker.Item style = {styles.pickerContainer} label="Sleccione un modulo ..." value=""/>
                {modulos.map((modulo)=>(
                    < Picker.Item style = {styles.text} key = {modulo.id} label ={modulo.titulo} value = {modulo.id}/> 
                ))}

            </Picker>

             <View style ={styles.renderedView}>
            <Text style ={styles.tituloLista} >Ver secciones existentes en este curso</Text>
            <FlatList
            data={secciones}
            renderItem={renderSecciones}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            columnWrapperStyle={{ gap: 10 }}
            >

            </FlatList>
            </View>

            <Text style ={styles.text}>Ingrese el titulo de la seccion</Text>
            <TextInput 
            style= {styles.input}
            value = {titulo}
            onChangeText={setTitulo}
            />
            <Text style ={styles.text}>Ingrese el numero de la seccion</Text>
            <TextInput 
            style= {styles.input}
            value = {numero}
            onChangeText={setNumero}
            />

             <Text style ={styles.text}>Ingrese la teoria para esta seccion</Text>
            <TextInput 
            multiline
            numberOfLines={10}
            placeholder="Escribe la teoria aqui ..."
            style= {styles.input}
            textAlignVertical="top"
            scrollEnabled
            value = {teoria}
            onChangeText={setTeoria}
            />

             <Text style ={styles.text}>Ingrese el ejemplo para esta seccion</Text>
            <TextInput 
            multiline
            numberOfLines={10}
            placeholder="Escribe el ejemplo aqui ..."
            textAlignVertical="top"
            scrollEnabled
            style= {styles.input}
            value = {ejemplo}
            onChangeText={setEjemplo}
            />
           
            <Pressable onPress={handleSubmit} style={styles.button}>
           <Text style ={styles.textButton}>Crear Seccion</Text>
         </Pressable>

        </View>
         
         <View style={styles.finalSeccion}>
        <Text style = {styles.title2}> Comienza a añadir quizzes</Text>
        <Pressable onPress={handleSubmit} style={styles.button}>
           <Text style ={styles.textButton2}>Agregar quiz</Text>
         </Pressable>
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
        flex:2
      },

      renderedView:{
        backgroundColor: '#a9a9a9',
        maxWidth:'90%',
        padding:15,
        borderRadius:20,
        marginTop:20,
      },
      tituloLista: {
        fontSize: 20,
        fontWeight: '600',
        color: '#4169e1',
        marginBottom: 20

    },

      finalSeccion:{
        alignItems:'center'
      }
})

