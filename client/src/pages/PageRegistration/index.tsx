import React, { FC } from 'react';
import FormRegistration from '../../components/forms/FormRegistration';
import activateTooltips from '../../scripts/activateTooltips';

activateTooltips();

const PageRegistration: FC = () => {
  return (
      <div className="row justify-content-center">
        <FormRegistration />
      </div>
    );
}

export default PageRegistration;
