export const HTTP_STATUS = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTANT_204: 204,
  
	BAD_REQUEST_400: 400,
	NOT_FOUND_404: 404,
  };

 type HttpStatusKeys = keyof typeof HTTP_STATUS
 export type HttpStatusType = (typeof HTTP_STATUS) [HttpStatusKeys]