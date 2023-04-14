import AWS from 'aws-sdk-q';

export const handler = async (event:any) =>{
  const test = AWS.EC2;
  console.log('just for usage : ', test);
  return 'test'
}