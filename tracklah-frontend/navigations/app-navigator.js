import { createDrawerNavigator } from "@react-navigation/drawer";
import AddExpenses from "../containers/App/AddExpenses";
import Home from "../containers/App/Home";


const AppStack = createDrawerNavigator();

export default function AppNav(){
    return(
        <AppStack.Navigator tabBar={()=>null} initialRouteName="home">
            <AppStack.Screen name = "Overview" component = {Home} />
            <AppStack.Screen name = "addExpenses" component = {AddExpenses} />
        </AppStack.Navigator>
    )
};