import { StyleSheet, View, Text } from 'react-native'

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login feito com sucesso
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2f3640'
    }
})