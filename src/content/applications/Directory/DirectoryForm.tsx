import { useState } from 'react';

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@mui/material';

import Box from '@mui/material/Box';
import { iDirectory } from 'src/models/directory';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'src/components/Form/InputText';
import { FormInputDropdown } from 'src/components/Form/InputSelect';

import db from '../../../firebase';
import 'firebase/database';

const positions = [
  {
    value: 'Dosen',
    label: 'Dosen'
  },
  {
    value: 'Tukang',
    label: 'Tukang'
  }
];

const defaultValues = {
  id: "",
  name: "",
  nip: "",
  email: "",
  position: ""
}

type Props = {
  onClose: any,
};

const Forms = ({ onClose }: Props) => {
  const { handleSubmit, reset, control, setValue } = useForm<iDirectory>({
    defaultValues: defaultValues,
  });

  let ref = db.ref("directory")

  const onSubmit = (data: iDirectory) => {
    const currentDateTime = new Date().toISOString();
    const formattedDateTime = new Date(currentDateTime).toISOString().replace(/\.\d{3}/, 'Z');
    data.createdDate = formattedDateTime
    console.log(data);
    const newPostRef = ref.push()
    newPostRef.set(data)
    onClose()
  }

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Input Directory" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <FormInputText name='name' control={control} label='Name' />
                    <FormInputText name='nip' control={control} label='NIP' />
                    <FormInputText name='email' control={control} label='E-mail' />
                    <FormInputDropdown name='position' control={control} label='Position' options={positions}  />
                    <FormInputText name='expertise' control={control} label='expertise' />
                    <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                      Submit
                    </Button>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Forms;

