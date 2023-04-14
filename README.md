require preinstalled **nvm** and **unzip**

note: dep. *'aws-sdk-q'* was used as example cause it is contain *'aws-sdk'* as *'peerDep'*

## Package with node14

1. use **node14**
  ```powershell
  nvm use 14
  ```

2. install packages
  ```powershell
  npm i
  ```

3. package app

```powershell
  node_modules/.bin/sls package
```

4. unzip created package
   
```powershell
  cd .serverless
  unzip serverless-webpack-app.zip
```

5. check packages

command:

```powershell
  npm ls
```

result:

```powershell
├── UNMET PEER DEPENDENCY aws-sdk@>= 2.1.5
└─┬ aws-sdk-q@0.0.2
  └── q@1.5.1
```

command:

```powershell
  npm ls aws-sdk
```

result:

```powershell
  └── (empty)
```

as expected it is empty cause we [forceExlude it](https://github.com/collierrgbsitisfise/serverless-webpack-issue/blob/main/serverless.yml#L21)

command:

```powershell
  ls .serverless/node_modules
```

result:

```powershell
  aws-sdk-q q
```

## Package with node16

1. use **node14**
  ```powershell
  nvm use 16.16
  ```

2. install packages
  ```powershell
  npm i
  ```

3. package app

```powershell
  node_modules/.bin/sls package
```

4. unzip created package
   
```powershell
  cd .serverless
  unzip serverless-webpack-app.zip
```

5. check packages

command:

```powershell
  npm ls
```

result:

```powershell
└── aws-sdk-q@0.0.2
```

command:

```powershell
  npm ls aws-sdk
```

result:

```powershell
  └─┬ aws-sdk-q@0.0.2
   └── aws-sdk@2.1358.0
```

^^^ aws-sdk present 

**wrong!** cause we [forceExlude it](https://github.com/collierrgbsitisfise/serverless-webpack-issue/blob/main/serverless.yml#L21)

command:

```powershell
  .serverless/node_modules
```

result:

```powershell
  available-typed-arrays for-each               ieee754                jmespath               which-typed-array
  aws-sdk                function-bind          inherits               q                      xml2js
  aws-sdk-q              get-intrinsic          is-arguments           querystring            xmlbuilder
  base64-js              gopd                   is-callable            sax
  buffer                  has                    is-generator-function  url
  call-bind              has-symbols            is-typed-array         util
  events                 has-tostringtag        isarray                uuid
```

^^^^ a lot of unexpected packages


### Problem statment:

**forceExclude does not work correctly with node16(npm v8) in case when excluded packages defined as "peerDep" in list of orignal packages**