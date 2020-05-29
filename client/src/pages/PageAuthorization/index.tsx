import React, { FC } from 'react';
import activateTooltips from '../../scripts/activateTooltips';
import FormAuthorization from '../../components/forms/FormAuthorization';

activateTooltips();

const PageAuthorization: FC = () => {
  return (
      <div className="row justify-content-center">
        <FormAuthorization />
      </div>
    );
}

export default PageAuthorization;
