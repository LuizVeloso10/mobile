import {Button as ButtonNativeBase, Text, IButtonProps} from 'native-base'

interface Props extends IButtonProps{
    title: string,
    type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({title, type = 'PRIMARY', ...rest}: Props){
    return(
        <ButtonNativeBase
            w="full"     
            rounded="sm"
            fontSize="md"
            bg={type === 'SECONDARY' ? 'red.500': 'yellow.500'}
            _pressed={{
                bg: type === 'SECONDARY' ? 'red.600': 'yellow.600'
            }}
            _loading={{
                _spinner: {color: 'black'}
            }}
            textTransform="uppercase"
            { ...rest}
        >
            <Text>
                {title}
            </Text>
        </ButtonNativeBase>
    );
}