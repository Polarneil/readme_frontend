import { Outlet } from 'react-router-dom'
import { styled } from '@mui/system';
import CustomAppBar from './appbar';

const PageWrapper = styled('div')((props) => ({ padding: props.theme.spacing(4) }));


export const StandardLayout = () => {

    return (
      <div>
      <CustomAppBar></CustomAppBar>
      <PageWrapper>
        {/* Child route components will be rendered here */}
        <Outlet />
      </PageWrapper>


      </div>
    )
}

export default StandardLayout;