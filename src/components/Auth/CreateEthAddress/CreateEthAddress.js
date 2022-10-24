import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';

import { useUser } from '../../../hooks/useUser';

import { StepCancel } from './StepCancel';
import { StepConfirm } from './StepConfirm';
import { StepFail } from './StepFail';
import { StepGenerate } from './StepGenerate';
import { StepInit } from './StepInit';
import { StepSuccess } from './StepSuccess';

const step = {
  // Propose to create the account. [yes btn] => GENERATE, [no btn] => CANCEL
  INIT: 'Access to document manager',
  // Ask if sure you want to cancel. [yes btn] => exit, [no btn] => back to previous ending step
  CANCEL: 'Cancel',
  // Display generated account and checkbox to confirm receipt. [next btn] => SIGN, [cancel btn] => CANCEL
  GENERATE: 'Generate Signature',
  // Ask to enter the password, create the tx, sign and send. [next btn] => SUCCESS or FAIL, [cancel btn] => CANCEL
  CONFIRM: 'Confirm Signature',
  // Account successfully signed message. [ok btn] => exit
  SUCCESS: 'Success',
  // Issue during account creation process. "Please retry". [ok btn] => exit
  FAIL: 'Failure',
};

export const CreateEthAddress = ({ onClose }) => {
  const viewSteps = [step.GENERATE, step.CONFIRM, step.SUCCESS];
  const [account, setAccount] = useState({ ethAddress: '', privateKey: '', pubKey: '' });
  //manage all steps
  const [currStep, setCurrStep] = useState(step.INIT);
  //manage steps history in case of cancel followed by continue
  const [prevStep, setPrevStep] = useState(step.INIT);
  //manage only the visual stepper for some steps
  const [currViewStep, setCurrViewStep] = useState(0);

  const { refreshUser } = useUser();

  const next = nextStep => {
    setCurrStep(nextStep);
    const key = viewSteps.indexOf(nextStep);
    if (key !== -1) setCurrViewStep(key);
  };

  const onCancel = () => {
    setPrevStep(currStep);
    next(step.CANCEL);
  };

  const stepperHeader = (
    <Box pb={'40px'}>
      <Stepper activeStep={currViewStep}>
        {viewSteps.map((label, key) => (
          <Step key={key}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );

  const noStepperHeader = (
    <Typography variant="h4" fontWeight={'bold'} color={'grey800.main'} width={'100%'} textAlign={'center'} pb={'40px'}>
      {currStep}
    </Typography>
  );

  const createHeader = () => (viewSteps.indexOf(currStep) !== -1 ? stepperHeader : noStepperHeader);

  const content = () => {
    switch (currStep) {
      case step.INIT:
        return <StepInit onClose={onClose} next={() => next(step.GENERATE)} />;

      case step.GENERATE:
        return (
          <StepGenerate onClose={onCancel} account={account} setAccount={setAccount} next={() => next(step.CONFIRM)} />
        );

      case step.CONFIRM:
        return (
          <StepConfirm
            onClose={onCancel}
            account={account}
            next={async isSuccess => {
              if (isSuccess) {
                next(step.SUCCESS);
              } else next(step.FAIL);
            }}
          />
        );

      case step.SUCCESS:
        return <StepSuccess onClose={() => refreshUser()} next={() => refreshUser()} />;

      case step.FAIL:
        return <StepFail onClose={onClose} next={onClose} />;

      case step.CANCEL: {
        return <StepCancel onClose={onClose} next={() => next(prevStep)} />;
      }
    }
  };

  return (
    <Box width={'100%'} height={'100%'} padding={'40px'} display={'flex'} flexDirection={'column'}>
      {createHeader()}
      <Box
        flex={1}
        display={'flex'}
        padding={'0 30px'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        rowGap={'10px'}>
        {content()}
      </Box>
    </Box>
  );
};

CreateEthAddress.propTypes = {
  onClose: PropTypes.func.isRequired,
};
