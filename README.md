# **OpenDairy Frontend**

## Installation

```bash
$ npm install
```

## Commands

```bash
# run app in development mode
$ npm run start

# build for prod
$ npm run build

# run linter with autofix
$ npm run lint
```

## Deploy with Docker
This procedure is for deployment on an AWS EC2 instance. The same can be done locally or on any virtual server with Docker installed.

1. **<u>Log on EC2</u>**

Use your favorite SSH tool to access your server instance.


2. **<u>Build a Docker image</u>**


A. **Build the image directly from the Git repo**

```sh
sudo docker build -t opendairy-frontend:latest https://github.com/Block0-Blockstart/opendairy-frontend.git
```

B. **Aternative: copy the repo**

* Clone a fresh copy of the git main branch locally.\
DO NOT npm install, as we don't want any node_modules !           

* Then, upload the whole project directory to the EC2 (FileZilla can do this).

* On the EC2, open a console and navigate to the directory you have just copied. Now, build the image:

```sh
sudo docker build -t opendairy-frontend:latest .
``` 

WARNING: notice the '.' at the end of the command line to instruct Docker to use the Dockerfile in current directory.


3. **<u>Run the image</u>**

```sh
sudo docker run --name opendairy-frontend -it -p 8080:80 --restart=unless-stopped opendairy-frontend:latest
```

4. **<u>AWS: update security group</u>**

If you use an AWS EC2, don't forget to update your security group rules to open the port used by this application (8080 in the example above). Add an inbound rule:

| Type | Protocol | Port range | Source | Description (optional) |
| --- | --- | --- | --- | --- |
| Custom TCP | TCP | 8080 | 0.0.0.0/0, ::/0 | Allows connections to opendairy-frontend



# Coding rules for MUI

### **1. Global customization**

We use component overrides in the MUI theme for customizing components through the entire app (example: button customization should be the same everywhere)           

We use component variants in the MUI theme or we create a styled custom component to offer a global alternative to MUI component overriding.

@see Overrides and variants: https://mui.com/material-ui/customization/theme-components/

@see Styled: https://mui.com/system/styled/

### **2. Local customization**

To make local customizations, we use the ```sx``` prop with maximum 4 css properties. For more, we use styled.

> Why ?      
> Because the ```sx``` styling way is much less performant than styled way.         
> This is the rendering speed order, from best efficient to less efficient:      
> **styled div** > **styled MUIComponent** > **MuiComponent with sx**        
> But the real difference starts to be significant when many properties are used, because the efficiency of ```sx``` degrades more quickly than styled.
> With less than 5 properties, ```sx``` efficiency is very close to styled, especially if these properties are not computed values.

@see Sx prop: https://mui.com/system/basics/#the-sx-prop

### **3. Don't reinvent the wheel**

We use additional propeties for customization only if it's really needed. There is no need to use styled or ```sx``` to add properties that are already available in the MUI component. For example, do not declare ```<Box sx={{ width: '100%' }}>```. Use the available property ```<Box width={'100%'}>```
<br />
<br />



These coding rules are based on :
- https://mui.com/system/basics/
- https://github.com/ryancogswell/mui-style-benchmarks
- https://stackoverflow.com/a/68383383


# Contact
**block0**
+ info@block0.io
+ [https://block0.io/](https://block0.io/)

# License
This repository is released under the [MIT License](https://opensource.org/licenses/MIT).



