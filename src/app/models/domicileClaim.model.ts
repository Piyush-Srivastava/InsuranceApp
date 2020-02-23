export class ClaimPostData{
    patientName:string;
      email: string;
      claimAmount:number;
      code: string
      nature: string;
      description: string;
      startDate:string;
      endDate: string;
      clinicName: string;
      clinicPinCode: number;
      regNo: number;
      doctorName: string;
}
export class ClaimedData{
  nature:string;
  clinicPinCode:number;
  description: string;
      startDate:string;
      endDate: string;
      clinicName: string;
      
      regNo: number;
      doctorName: string;
      claimAmount:number;
      status:string;

}