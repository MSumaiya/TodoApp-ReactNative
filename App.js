//import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {
  //console.log('setText: ', setText);
  const [todos, setTodos] = useState([
    {text: 'buy coffee', key:'1'},
    {text: 'create an app', key:'2'},
    {text: 'study', key:'3'}
  ]);
  //const [text, setText] = useState('');
  const pressHandler = (key) =>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo=> todo.key != key)
    });
  }

  const submitHandler = (text, setText) =>{
    if(text.length > 3){

      setTodos((prevTodos)=>{
        return [
          { text:text, key: Math.random().toString()},
          ...prevTodos
        ]
      })
    }else {
      Alert.alert('OOPS!','todos must be longer than 3 character')
    }
    
    
  }
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler}/>
            <View style={styles.list}>
              <FlatList 
                data={todos}
                renderItem={({item})=>(
                  <TodoItem item={item} pressHandler={pressHandler}/>
                )}
              />
            </View>
          </View>
          {/*  <Text>Hello World!</Text>
          <StatusBar style="auto" /> */}
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
  content:{
    padding:40,
    flex:1,
  },
  list:{
    flex:1,
    marginTop: 20,
  }
});
