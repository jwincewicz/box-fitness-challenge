import { Path } from '@box-fc/frontend/domain';
import { Dashboard, LandingPage, RequireAuthRouteUser, theme, UnauthorizedHandler } from '@box-fc/frontend/ui';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import './styles.css';

dayjs.extend(utc);
dayjs.extend(isBetween);

const queryClient = new QueryClient();

export const App = () => {
    return (
        <GoogleOAuthProvider clientId="156218409015-gpeb1evq2j326ftj7t7avskqs7jubjbe.apps.googleusercontent.com">
            <ParallaxProvider>
                <ChakraProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
                        <Router basename="/">
                            <UnauthorizedHandler />
                            <Routes>
                                <Route path={Path.LANDING_PAGE} element={<LandingPage />} />

                                <Route element={<RequireAuthRouteUser />}>
                                    <Route path={`${Path.DASHBOARD}/*`} element={<Dashboard />} />
                                </Route>

                                <Route path={'*'} element={<Navigate to={Path.LANDING_PAGE} replace />} />
                            </Routes>
                        </Router>
                    </QueryClientProvider>
                </ChakraProvider>
            </ParallaxProvider>
        </GoogleOAuthProvider>
    );
};
