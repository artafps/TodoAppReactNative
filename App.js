import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const handleSubmit = () => {
    if (Todo !== "" && Todo !== " ") {
      const todos = [...Todos];
      const data = {
        id: `${Math.floor(Math.random() * 10000)}`,
        text: Todo,
        complited: false,
      };
      todos.push(data);
      setTodo("");
      setTodos(todos);
    }
  };
  const handleDeletetodo = (id) => {
    const todos = [...Todos];
    const todosUpdate = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(todosUpdate);
  };
  const handleComplitedtodo = (id) => {
    const todos = [...Todos];
    const todoindex = todos.findIndex((e) => e.id === id);
    const todofind = todos[todoindex];
    todofind.complited = !todofind.complited;
    todos[todoindex] = todofind;
    setTodos(todos);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.boxtodo}>
        {Todos.length > 0
          ? Todos.map((item) => {
              return (
                <View key={item.id}  style={ item.complited ? [styles.backgroundColorcomplited,styles.todos ]:[styles.todos]}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="sticker-check-outline"
                      size={30}
                      color={ item.complited ? "#fff":"green"}
                      onPress={() => {
                        handleComplitedtodo(item.id);
                      }}
                    />
                    <MaterialCommunityIcons
                      style={{ marginLeft: 5 }}
                      name="sticker-remove-outline"
                      size={30}
                      color={ item.complited ? "#fff":"red"}
                      onPress={() => {
                        handleDeletetodo(item.id);
                      }}
                    />
                  </View>
                  <Text >{item.text}</Text>
                </View>
              );
            })
          : null}
      </ScrollView>
      <View style={styles.boxsendertodo}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.btnstyle}>Add Todo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputnumber}
          placeholder="Todo"
          onChangeText={(e) => setTodo(e)}
          defaultValue={Todo}
          keyboardType="default"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#426cf5",
    width: "30%",
    height: 60,
    padding: 20,
    color: "#fff",
    borderRadius: 15,
    fontSize: 15,
    margin: "auto",
    fontWeight: "bold",
  },
  btnstyle: {
    height: 60,
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  inputnumber: {
    borderColor: "#426cf5",
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "solid",
    height: 60,
    width: "69%",
    fontSize: 15,
    padding: 15,
    textAlign: "left",
  },
  boxsendertodo: {
    display: "flex",
    height: "auto",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
  },
  boxtodo: {
    marginTop: 30,
    width: "90%",
  },
  todos: {
    shadowColor: "#002861",
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 1,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  backgroundColorcomplited:{
    backgroundColor:"#3d9af2",
  }
});
