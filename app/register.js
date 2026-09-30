import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '../services/authService';
import AppButton from '../src/components/AppButton';
import AppInput from '../src/components/AppInput';

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleRegister (){
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
                Alert.alert('Atenção', 'Preencha todos os campos.');}

        if (password.length<6) {
            return Alert.alert('Atenção', 'A senha deve conter no mínimo 6 caracteres');}

        if (password !== confirmPassword) {
            return Alert.alert('Erro', 'As senhas não coincidem.');}
        
        try {
            setLoading(true);
            const{error} = await signUp(email.trim(), password);
            if(error){
                Alert.alert('Erro no cadastro', error.message);
                console.log('Erro no cadastro', error.message);
                return;
            } else {
                Alert.alert('Sucesso!',
                    'Conta criada com sucesso. Faça o login para continuar.');
                router.replace('/');
            }
        } catch (error) {
            Alert.alert('Erro', error.message || ' Não foi possível criar a conta.')
        }
         finally {
            setLoading(false);
        }
        
            
        Alert.alert('Sucesso', 'Cadastro realizado!');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View>
                <Text style={styles.title}>
                    Criar nova conta
                </Text>

                <Text style={styles.subtitle}>
                    Preencha os dados para começar
                </Text>

                <AppInput
                    label="Email"
                    placeholder="seu@email.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <AppInput
                    label="Senha"
                    secureTextEntry
                    placeholder="******"
                    value={password}
                    onChangeText={setPassword}
                />

                <AppInput
                    label="Confirmar senha"
                    secureTextEntry
                    placeholder="******"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <AppButton
                    title="Cadastrar"
                    loading={loading}
                    onPress={handleRegister}
                />

               <TouchableOpacity onPress={() => router.push('/')}>
                    <Text style={styles.link}>
                        Já tem uma conta? Faça seu login.
                    </Text>
                </TouchableOpacity> 
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f8f9fa',
    },

    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#2f3640',
        textAlign: 'center',
    },

    subtitle: {
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 32,
    },

    link: {
        color: '#008f72',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '700',
    },
});
