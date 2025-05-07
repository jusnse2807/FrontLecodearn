import { Pressable } from "react-native";
import { FlatList, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
type Opcion = {id: string; name: string, reference: string};
const opciones: Opcion[] = [
    {id: '1', name: 'Monitorear usuarios', reference: 'CrearCurso'},
    {id: '2', name: 'Modificar usuarios', reference: 'CrearCurso'},
    {id: '3', name: 'ver cursos', reference: 'Courses'},
    {id: '4', name: 'crear cursos', reference: 'CrearCurso'},
    {id: '5', name: 'Registros y pagos', reference: 'CrearCurso'},
    {id: '6', name: 'chatbot', reference: 'CrearCurso'},
    {id: '7', name: 'Agregar modulo, seccion o quiz', reference: 'CrearCurso'},
];

export default function AdminOptions(){

    const renderItem = ({item}: {item: Opcion}) =>(
    
     <Link href={`administrador/${item.reference}` as any} asChild>
    <Pressable style = {Styles.container}>
        <Text style = {Styles.element}>{item.name}</Text>
        <Link href="/login"></Link>
     </Pressable>
     </Link>
    );

    return(
       
        <View style = {Styles.fondo}>

         <View style = {Styles.fondoTitulo}>
         <Text style = {Styles.title}> Administrador </Text>
        
         </View>

        <FlatList
        data={opciones}
        renderItem = {renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        />
        </View>
    );
}

const Styles = StyleSheet.create({

   fondo:{
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginTop:80,
    flex:1,
    
    },

    container:{
        backgroundColor: '#f8f8ff',
        padding: 20,
        borderRadius: 20,
        flex:1,
        alignItems: 'center',
        maxWidth:'50%' 
        },

    fondoTitulo:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,  
    },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#6a5acd',
    marginBottom: 20
  },

  element: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6a5acd'
  },
});