import React, {useContext} from 'react';
import { UserContext} from '../../contexts';
import{
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles, colors, cardStyles,btnStyles } from '../../styles';
import {Card, calculateTotal, colorScale} from '../../components';
import { AntDesign, Entypo } from '@expo/vector-icons';
import moment from 'moment';
// import { VictoryPie, VictoryTheme, VictoryAxis, VictoryLabel, VictoryChart, VictoryBar} from 'victory-native';

export default function Home({navigation}){

    const {userLoggedIn} = useContext(UserContext);

    const totalExpenses = calculateTotal(false,itemData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // better than toLocaleString which has memory leak issue. Display as string with thousand separator
    //console.log(`Current Month Total Expenses: $ ${totalExpenses}` ?? 0)
    
    //const totalIncome = calculateTotal(true, itemData)
    //console.log(`Current Month Total Income: $ ${totalIncome}` ?? 0 )

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome {userLoggedIn.username}</Text>
            <View>          
                <Card style={cardStyles.totalExCard}>
                    <TouchableOpacity onPress={()=>navigation.navigate("List Current Month Items")}>
                    <Text style={{fontWeight: "bold", color: "#E2E2E2", left:5, fontSize:15}}>{moment().format("MMMM").toString().toUpperCase()} EXPENSES:</Text>
                    <Text style={{color: "#E2E2E2", left:5, fontSize:12}}>(Up till {moment().format("Do MMM").toString()})</Text>
                    <Text style={cardStyles.totalExText}>${totalExpenses}</Text>
                    </TouchableOpacity>
                </Card>
            </View>
            <View style={cardStyles.graphsCard}>
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Graph Chart"
                    onPress={()=>navigation.navigate("Income and Expenses Bar Chart")}
                >
                    <Entypo 
                        name="bar-graph" 
                        size={100} 
                        color="lightgrey" 
                        style={styles.graphIcon}
                    />
                {/* Income & Expenses Chart (small version) */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Pie Chart" 
                    onPress={()=>navigation.navigate("Expenses Pie Chart")} 
                >
                    <AntDesign 
                        name="piechart" 
                        size={100} 
                        color="lightgrey" 
                        style={styles.pieIcon}
                    />
                    {/* Pie Chart (Small Version) */}
                </TouchableOpacity>
            </View>
            <View>
                <Card style={cardStyles.exListCard}>
                        <Text style={{color:"#E2E2E2", fontSize:20}}>Expense List</Text>
                </Card>
                <TouchableOpacity
                    style={{left: 160, top: 120, width: 65, height: 65}} 
                    onPress={()=>navigation.navigate("Add Expense or Income Item")}>
                <AntDesign 
                    style={styles.addIcon}
                    name="pluscircle"
                    size= {60} 
                />
                </TouchableOpacity>
            </View>
        </View>
    )
};