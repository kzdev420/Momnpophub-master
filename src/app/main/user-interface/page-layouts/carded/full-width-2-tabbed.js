import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FuseAnimateGroup } from '@fuse';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Slider from 'react-animated-slider';
import { SocialIcon } from 'react-social-icons';
import horizontalCss from 'react-animated-slider/build/horizontal.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="www.momnpophub.com">
        MomNPopHub.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SocialLinks() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <SocialIcon url="https://facebook.com/momnpophub" />  <SocialIcon url="https://twitter.com/momnpophub" /> <SocialIcon url="https://instagram.com/momnpophub" /> <SocialIcon url="https://linkedin.com/momnpophub" />
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    padding: theme.spacing(1),
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
  badge : {
    backgroundColor: theme.palette.error.main,
    color          : theme.palette.getContrastText(theme.palette.error.main)
  },
  price : {
    backgroundColor: theme.palette.primary[600],
    color          : theme.palette.getContrastText(theme.palette.primary[600])
  }
}));

const sections = [
  'Home',
  'Business Signup',
  'Latest Coupons',
  'MomNPop App'
];

const featuredPosts = [
  {
    title: 'I am a Customer Who Buys from Small Business',
    description: 'Great!  Download our App Below.  All of Our Coupons are 100% Free.',
    link1: <img src='assets/images/App/google-play-badge-sm.png' alt='Play Store logo' style={{marginRight: 10}}/>,
    link2: <img src='assets/images/App/app-store-badge-sm.png' alt='App Store logo' style={{marginLeft: 10}}/>
  },
  {
    title: 'I own/work at a Small Business',
    description: 'Tell us a little about your business so we can get started.',
    link1: <Typography variant="h6" paragraph><Button variant="outlined" color='secondary'>Start Business Application</Button></Typography>,
    link2: <img src='assets/images/backgrounds/1x1.png' alt='spacer' height='15px' />
  }
];

const howWeDoIt = [
  {
    title: 'Understand Your Business',
    description: 'Our goal is to make sure we are an exclusive platform for small businesses a.k.a. mom n’ pop shops. We ensure our platform is exclusively tailored to help your small business grow.',
    link1: <img src='assets/images/backgrounds/requirements.png' alt='requirements' />,
    link2: <img src='assets/images/backgrounds/1x1.png' alt='spacer' height='23px' />
  },
  {
    title: 'Introduce New Customers',
    description: 'Once we complete the sign up process with your small business, we launch your promotional coupons or discounts on our revolutionary platform. You business is instantly visible to customers locally and nationally.',
    link1: <img src='assets/images/backgrounds/digital_marketing.png' alt='digital marketing' />
  },
  {
    title: 'Help You Grow',
    description: 'Compete with bigger businesses and leave the heavy lifting of your growth to us. Mom n’ Pop Hub invoices you a fixed price per coupon used by the customer.',
    link1: <img src='assets/images/backgrounds/business_growth.png' alt='business growth' />,
    link2: <img src='assets/images/backgrounds/1x1.png' alt='spacer' height='24px' />
  }
];

const social = ['GitHub', 'Twitter', 'Facebook'];

const carousel = [{
    image: 'assets/images/carousel/taming_wild.png',
    title: '25% Off All Puppy Training',
    description: 'Now Through 10/1/2019 at All Memphis Stores',
    button: 'Get Coupon',
    color: '#000'
},{
    image: 'assets/images/carousel/901_banner.png',
    title: '$25 Off First Cleaning',
    description: 'For Harbor Town Residents',
    button: 'Get Coupon',
    color: '#2a5faa'
},{
    image: 'assets/images/carousel/cox_banner.png',
    title: '50% Off Alaskan King Salmon',
    description: 'Cox Corner Market - Visit Us at Our New Collierville Location',
    color: "#ffffff"
},{
    image: 'assets/images/carousel/tania_banner.png',
    title: 'Macaroons',
    description: 'Buy One Get One Free - All Through September at Our Memphis Location',
    color: '#000'
}]

const footers = [
  {
    title: 'Company',
    description: ['Team', 'Contact Us', 'Sign In'],
  },
  {
    title: 'FAQ',
    description: ['For Businesses', 'For Customers'],
  },
  {
    title: 'Coupons',
    description: ['Near Me', 'Products', 'Services'],
  },
  {
    title: 'Legal',
    description: ['Privacy Policy', 'Terms and Conditions'],
  }
];

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <img className="text-32 mr-12" src="assets/images/logos/momnpophub_sm.png" alt="logo"/>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            Mom N Pop Hub
          </Typography>
          <Button variant="outlined" size="small">
            Sign In
          </Button>
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Link
              color="inherit"
              noWrap
              key={section}
              variant="body2"
              href="#"
              className={classes.toolbarLink}
            >
              {section}
            </Link>
          ))}
        </Toolbar>
        <br />
        <main>
          {/* Main featured post */}
          <Slider classNames={horizontalCss} autoplay="4000">
            {carousel.map((item, index) => (
                <div
                    key={index}
                    className='slider-content'
                    style={{ background: `url('${item.image}') no-repeat center center` }}>
                    <div />
                    <Grid container>
                      <Grid item md={12}>
                        <div className={classes.mainFeaturedPostContent}>
                          <Typography align="center" component="h1" variant="h3" style={{color: item.color}} gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography align="center" variant="h5" style={{color: item.color}} paragraph>
                            {item.description}
                          </Typography>
                          <Typography align="center" variant="h5" paragraph>
                            <Button variant="contained" color="secondary">
                              {item.button}
                            </Button>
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                </div>
            ))}
          </Slider>
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              Check Out These Great Coupons in Your Area
            </Typography>
          </Toolbar>
          {/* End main featured post */}
          {/* Sub featured posts */}

          <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                  About Us
                </Typography>
                <Typography>
                  Mom n' Pop Hub is a platform created to help small businesses compete with larger businesses by
                  helping them acquire new customers.  We are the only online platform which focusses exclusively
                  towards small businesses.
                </Typography>
                <br />
                <Typography>
                  Our platform is open for customer who like to buy from snall businesses, and for small businesses
                  who are looking to acquire more customers.
                </Typography>
                <br />
                <Typography>
                  Customers who love to buy from small businesses can sign up for the platform by downloading our
                  new App, and using the same social media login they already use.
                </Typography>
                <br />
                <Typography>
                  Small businesses who are looking to grow and constantly acquire new customers are invited to join
                  out platoform.  We are in our early days so we are opening limited spots on our platform.  Please
                  submit you small business information and we will contact you within 2-3 business days to confirm
                  your business qualification to be on the Mom n Pop Hub platform.
                </Typography>
                <br />
          </Paper>
          <br />
          <Grid container spacing={4} className={classes.cardGrid}>
            {featuredPosts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {post.title}
                      </Typography>                        
                      <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography>
                        {post.link1}
                        {post.link2}
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* End sub featured posts */}
          <br />
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              How We Do It
            </Typography>
          </Toolbar>
          <br /><br />
          <Grid container spacing={4} className={classes.cardGrid}>
            {howWeDoIt.map(action => (
              <Grid item key={action.title} xs={12} md={4}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography align="center" variant="h5" paragraph>
                        {action.link1}  
                      </Typography>
                      <Typography align="center" component="h2" variant="h5">
                        {action.title}
                      </Typography>
                      <br />                        
                      <Typography align="center" variant="subtitle1" paragraph>
                        {action.description}
                      </Typography>  
                      {action.link2}                      
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>

          <br />
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              Our Plans
            </Typography>
          </Toolbar>
          <br />

          <div >

<div className="w-full max-w-2xl mx-auto">

    <FuseAnimateGroup
        enter={{
            animation: "transition.slideUpBigIn"
        }}
        className="flex items-center justify-center flex-wrap"
    >
        <div className="w-full max-w-320 sm:w-1/3 p-12">
            <Card className="relative">

                <div className="p-32 text-center">
                    <Typography className="text-32">
                        Plan 1
                    </Typography>
                    <Typography color="textSecondary" className="text-16 font-medium">
                        Great for just starting out
                    </Typography>
                </div>

                <CardContent className="text-center p-0">

                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                        <div className="flex justify-center">
                            <Typography color="inherit" className="font-medium">$</Typography>
                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">40</Typography>
                        </div>
                        <Typography color="inherit">
                            / Month
                        </Typography>
                    </div>

                    <div className="flex flex-col p-32">
                        <Typography color="textSecondary" className="mb-16">
                            5 Coupons per Month
                        </Typography>
                        <Typography color="textSecondary" className="mb-16">
                            Coupon Analytics
                        </Typography>
                        <Typography color="textSecondary" className="mb-16">
                            Products and Services
                        </Typography>
                        <Typography color="textSecondary">
                            24 / 7 Email Support
                        </Typography>
                    </div>
                </CardContent>

                <div className="flex flex-col items-center justify-center pb-32 px-32">
                <Button variant="outlined" color='secondary' className='w-full'>
                  Sign Up for Plan 1
                </Button>
                </div>
            </Card>
        </div>

        <div className="w-full max-w-320 sm:w-1/3 p-12">

            <Card className="relative" raised>

<div className="absolute top-0 inset-x-0 flex justify-center">
                    <div className={clsx(classes.badge, "py-4 px-8")}>
                        <Typography variant="caption">BEST VALUE</Typography>
                    </div>
                </div>
                <div className="p-32 text-center">
                    <Typography className="text-32">
                        Plan 2
                    </Typography>
                    <Typography color="textSecondary" className="text-16 font-medium">
                        Pay as You Go
                    </Typography>
                </div>

                <CardContent className="text-center p-0">

                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                        <div className="flex justify-center">
                            <Typography color="inherit" className="font-medium">$</Typography>
                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">4</Typography>
                        </div>
                        <Typography color="inherit">
                            / Coupon Used by Customer
                        </Typography>
                    </div>

                    <div className="flex flex-col p-32">
                        <Typography color="textSecondary" className="mb-16">
      10 Coupons per Month
                        </Typography>
                        <Typography color="textSecondary" className="mb-16">
                            Enhanced Coupon Analytics
                        </Typography>
                        <Typography color="textSecondary" className="mb-16">
                            Products and Services
                        </Typography>
                        <Typography color="textSecondary">
                            24 / 7 Email support
                        </Typography>
    <br />
                        <Typography color="textSecondary">
                            Advanced reporting
                        </Typography>
                    </div>
                </CardContent>

                <div className="flex flex-col items-center justify-center pb-32 px-32">
                <Button variant="outlined" color='secondary' className='w-full'>
                  Sign Up for Plan 2
                </Button>
                </div>
            </Card>
        </div>

        <div className="w-full max-w-320 sm:w-1/3 p-12">
            <Card className="relative">

                <div className="p-32 text-center">
                    <Typography className="text-32">
                        Plan 3
                    </Typography>
                    <Typography color="textSecondary" className="text-16 font-medium">
                        Business Partner Level
                    </Typography>
                </div>

                <CardContent className="text-center p-0">

                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                        <div className="flex justify-center">
                            <Typography color="inherit" className="font-medium">$</Typography>
                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">99</Typography>
                        </div>
                        <Typography color="inherit">
                            / Month
                        </Typography>
                    </div>

                    <div className="flex flex-col p-32">
                        <Typography color="textSecondary" className="mb-16">
                            Unlimited Coupons
                        </Typography>
                        <Typography color="textSecondary" className="mb-16">
      Enhanced Coupon Analytics
                        </Typography>
                        <Typography color="textSecondary" className="mb-16">
      Products and Services
                        </Typography>
                        <Typography color="textSecondary">
      24 / 7 Live Support
                        </Typography>
    <br />
    <Typography color="textSecondary">
                            Advanced reporting
                        </Typography>
    <br />
    <Typography color="textSecondary">
                            1 on 1 Monthly Strategy Meeting
                        </Typography>
                    </div>
                </CardContent>

                <div className="flex flex-col items-center justify-center pb-32 px-32">
                <Button variant="outlined" color='secondary' className='w-full'>
                  Sign Up for Plan 3
                </Button>
                </div>
            </Card>
        </div>
    </FuseAnimateGroup>
</div>
</div>

        </main>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <SocialLinks />
        </Box>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}