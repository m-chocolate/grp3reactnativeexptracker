import React from 'react';
import{
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    View,
    Text
} from 'react-native';
import { ConversionInput } from '../../components/ConversionInput';
import currencyStyles from '../../styles/CurrencyConverter-styles';
import styles from '../../styles/ConversionInput-styles';
import moment from 'moment';

export default function CurrencyConverter(){

    const baseCurrency = "SGD"
    const quoteCurrency = "USD"
    const conversionRate = 1.8973

    return(
        <SafeAreaView style={currencyStyles.container}>
            <StatusBar barStyle='dark-content'/>
            <View style={currencyStyles.view}>
                <Image
                    style={currencyStyles.image}
                    source={require('../../assets/ConverterCircle.png')}
                />
            </View>
                <ConversionInput
                    text={baseCurrency}
                    value="123"
                    onButtonPress={() => alert('todo!')}
                    onChangeText={text => console.log('text', text)}
                    keyboardType="numeric"
                />
                <ConversionInput 
                    text={quoteCurrency}
                    value="123"
                    onButtonPress={() => alert('todo!')}
                    editable={false}
                />
            <Text style={currencyStyles.text}>{`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${moment().format("MMM Do YYYY")}.`}</Text>
            
        </SafeAreaView>
    );
};