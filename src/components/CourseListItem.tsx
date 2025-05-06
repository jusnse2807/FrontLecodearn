import { StyleSheet, View, Text, Image } from "react-native"
import { Course } from "../types"

type CourseListItemProps = {
  curso: Course;
};

const CourseListItem = ({curso}: CourseListItemProps) => {

   return (
    <View style = {Styles.container}>
    <Image source= {{ uri: curso.imagen}} style= {Styles.image}/>    
     <Text style={Styles.title}>{curso.nombre}</Text>
     <Text style = {Styles.num}>{curso.numModulos}</Text>
    </View>
   );

};

const Styles = StyleSheet.create({

  container: {
    backgroundColor: '#f0ffff',
    padding: 10,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center'

  },

  image: {
    width: 80,
    height: 80,
    aspectRatio: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 10,
    gap: 10
  },
  num: {
    color: '#a9a9a9',
    marginLeft:10
  },



});