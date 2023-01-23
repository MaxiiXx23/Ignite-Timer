import { ButtonContainer, TypeVariants } from "./index.styles"

interface IProps {
    variant?: TypeVariants
}

export function Button ({ variant="primary" }: IProps) {

    return (
        <ButtonContainer
            variant={variant}
        >
            Enviar
        </ButtonContainer>
    )

}