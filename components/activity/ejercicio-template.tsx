import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated'
import { View } from 'react-native'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'

interface EjercicioTemplateProps {
    description: string,
    placeholder: string
    inputState: {
        value: any,
        set: React.Dispatch<React.SetStateAction<any>>,
    }
    children: React.ReactNode
}

export default function EjercicioTemplate({ description, inputState: state, children, placeholder }: EjercicioTemplateProps) {
    const opacity = useSharedValue(0); // Valor inicial para la opacidad

    // Estilo animado
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: opacity.value }], // Opcional: animación de escala
        };
    });

    const onChangeInput = (text: string) => {

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

        state.set(text);
    };

    return (
        <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
            <View>
                <Text>{description}</Text>
            </View>
            <Input
                placeholder={placeholder}
                value={state.value}
                onChangeText={onChangeInput}
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />

            <View className='h-8'>
                <Animated.View style={[animatedStyle]}>
                    {children}
                </Animated.View>
            </View>
        </View>
    )
}
