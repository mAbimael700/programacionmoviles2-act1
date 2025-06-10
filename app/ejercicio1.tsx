import React from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function Actividad1() {
    const [name, setName] = React.useState<string | undefined>()
    const opacity = useSharedValue(0); // Valor inicial para la opacidad

    const onChangeText = (text: string) => {

        if (text) {
            opacity.value = withTiming(1, {
                duration: 300,
                easing: Easing.out(Easing.ease),
            });
        } else {

            opacity.value = withTiming(0, {
                duration: 300,
                easing: Easing.in(Easing.ease),
            });
        }

        setName(text);
    };

    // Estilo animado
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: opacity.value }], // Opcional: animación de escala
        };
    });

    return (
        <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
            <View>
                <Text>Cree un programa que solicite el nombre del usuario y lo salude por su nombre</Text>
            </View>

            <Input
                placeholder='Ingrese su nombre...'
                value={name}
                onChangeText={onChangeText}
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />

            <View className='h-8'>
                <Animated.View style={[animatedStyle]}>
                    {<Text className='text-3xl font-semibold capitalize'>Hola {name}</Text>}
                </Animated.View>
            </View>
        </View>
    )
}