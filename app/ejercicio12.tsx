import React from "react"
import { View } from "react-native"
import EjercicioTemplateMultiple, { InputConfig } from "~/components/activity/EjercicioMultipleTemplate"
import { Text } from "~/components/ui/text"

export default function EjercicioOperacionesBasicas() {
    const [numero1, setNumero1] = React.useState<string>('')
    const [numero2, setNumero2] = React.useState<string>('')
    const [resultados, setResultados] = React.useState<{
        suma: number,
        resta: number,
        multiplicacion: number,
        division: number | string
    } | null>(null)

    const inputs: InputConfig[] = [
        {
            key: 'numero1',
            placeholder: '15',
            label: 'Primer número:',
            value: numero1,
            set: setNumero1
        },
        {
            key: 'numero2',
            placeholder: '3',
            label: 'Segundo número:',
            value: numero2,
            set: setNumero2
        }
    ]

    const calcularOperaciones = () => {
        if (numero1 && numero2) {
            const num1 = parseFloat(numero1)
            const num2 = parseFloat(numero2)
            
            if (!isNaN(num1) && !isNaN(num2)) {
                const suma = num1 + num2
                const resta = num1 - num2
                const multiplicacion = num1 * num2
                const division = num2 !== 0 ? num1 / num2 : 'No se puede dividir por cero'
                
                setResultados({
                    suma,
                    resta,
                    multiplicacion,
                    division
                })
            } else {
                setResultados(null)
            }
        }
    }

    React.useEffect(() => {
        calcularOperaciones()
    }, [numero1, numero2])

    return (
        <EjercicioTemplateMultiple
            description="Elabore un programa que permita recibir dos números y mostrar la suma, resta, multiplicación y división de esos dos números."
            inputs={inputs}
        >
            <View className='gap-2'>
                {resultados ? (
                    <>
                        <Text className='text-center font-semibold text-lg mb-2'>Resultados:</Text>
                        <Text className='text-center'>Suma: {numero1} + {numero2} = {resultados.suma}</Text>
                        <Text className='text-center'>Resta: {numero1} - {numero2} = {resultados.resta}</Text>
                        <Text className='text-center'>Multiplicación: {numero1} × {numero2} = {resultados.multiplicacion}</Text>
                        <Text className='text-center'>
                            División: {numero1} ÷ {numero2} = {
                                typeof resultados.division === 'number' 
                                    ? resultados.division.toFixed(4)
                                    : resultados.division
                            }
                        </Text>
                    </>
                ) : (
                    <Text className='text-center text-lg font-semibold'>
                        Ingrese dos números válidos
                    </Text>
                )}
            </View>
        </EjercicioTemplateMultiple>
    )
}