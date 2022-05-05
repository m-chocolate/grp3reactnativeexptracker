import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export const barChartHeight = Dimensions.get("window").height * 0.4;
export const barChartWidth = Dimensions.get("window").width;

export const chartStyles = StyleSheet.create({

    chart: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        justifyContent: "center",
        alignItems: "center"
    },
    pielegend: {
        backgroundColor: colors.listBackground,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: barChartWidth*0.90,
        height: barChartHeight*0.5,
        marginBottom: 10
    },
    dropdownpicker: {
        backgroundColor: colors.listBackground,
        borderRadius: 20
    },
    tablecontainer: {
        backgroundColor: colors.listBackground,
        justifyContent: "center",
        borderRadius: 20,
        margin: '6%',
        width: barChartWidth*0.88,
    },
    tablecell: {
        width: 0.20*barChartWidth,
        padding: 5,
        alignContent: 'center',
        
    },
    row: {
        flexDirection: "row",
        alignSelf: "center",
    },
    text: {
        textAlign: "center",
    },
});

const viewChartStyles = { barChartHeight, barChartWidth, chartStyles}

export default viewChartStyles;
