import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, RADIUS, SPACING } from '../constants/theme';
export default function AppInput(    
    {label, error, ...props }
){
    return (
        <View style={styles.container}>
            {label &&<Text style={styles.label}>{label}</Text>}
            <TextInput style={[styles.input, error&&styles.errorInput]} {...props} placeholderTextColor={COLORS.muted}/>
            {error &&<Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margimBottom:SPACING.md
    },
    label: {
        color:COLORS.text, 
        fontWeight:'600',
        marginBottom:6
    },
    input: {
        backgroundcolor: '#fff',
        borderWidth:1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        fontSize:16
    },
    errorInput:{
        borderColor:COLORS.danger,
    },
    error: {
        color:COLORS.danger,
        fontSize: 12,
        marginTop: 4
    }
})