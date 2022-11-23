import { Button, Modal, Text, Input, Spacer } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { DiagramContext } from "../../context/diagram/Context";

const schema = yup
    .object({
        title: yup.string().required("Campo requerido"),
        subTitle: yup.string().required("Campo requerido"),
    })
    .required();

export const ModalCard = () => {
    const { dataToUpdate, removeDataToUpdate, updateItemOfData } =
        useContext(DiagramContext);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            subTitle: "",
            ...dataToUpdate,
        },
        criteriaMode: "firstError",
    });

    const onSubmit = (data: any) => updateItemOfData(data);

    return (
        <div>
            <Modal
                closeButton
                onClose={() => removeDataToUpdate()}
                open={!!dataToUpdate}
                blur
            >
                <Modal.Header>
                    <Text id="modal-title" h3 size={20}>
                        Actualizar NODO
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    labelPlaceholder="Titulo"
                                    type="text"
                                    helperText={errors.title?.message}
                                    status={errors.subTitle && "error"}
                                    {...field}
                                />
                            )}
                        />
                        <Spacer y={2.5} />
                        <Controller
                            name="subTitle"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    labelPlaceholder="Sub Titulo"
                                    type="text"
                                    helperText={errors.subTitle?.message}
                                    status={errors.subTitle && "error"}
                                    {...field}
                                />
                            )}
                        />
                        <Spacer y={2} />
                        <Button auto type="submit">
                            Actualizar
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};
