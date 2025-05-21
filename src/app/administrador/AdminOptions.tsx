import { Pressable } from "react-native";
import { FlatList, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

type Opcion = {id: string; name: string, reference: string};
const opciones: Opcion[] = [
    {id: '1', name: 'Crear secciones', reference: 'CrearSeccion'},
    {id: '2', name: 'Modificar usuarios', reference: 'ModificarUsuario'},
    {id: '3', name: 'Ver cursos', reference: 'Courses'},
    {id: '4', name: 'Crear cursos', reference: 'CrearCurso'},
    {id: '5', name: 'Registros y pagos', reference: 'CrearCurso'},
    {id: '6', name: 'Chatbot', reference: 'CrearCurso'},
    {id: '7', name: 'Crear modulo', reference: 'CrearModulo'},
];

export default function AdminOptions(){

  useAuthGuard();

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
        maxWidth:'50%',
        // iOS shadow
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,

      // Android shadow
      elevation: 6,
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