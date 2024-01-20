from fastapi import FastAPI, UploadFile, File
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import torch
from torchvision import transforms
from mangum import Mangum
import os
import uvicorn
import logging
logger = logging.getLogger()
logger.setLevel("INFO")
  
def lambda_handler(event, context):
    logger.info(event)
# import aws_cdk as cdk
app = FastAPI()
handler = Mangum(app)

transform = transforms.Compose([
    transforms.ToTensor(),  # Converts the image to a PyTorch tensor
])
classes =   {0:'blue_rare',1:'rare',2:'medium_rare',3:'medium',4:'medium_well_done',5:'well_done'}
@app.get('/')
async def root():
    return {'message': 'api is online'}

def load_image(data):
    image = Image.open(BytesIO(data))
    rgb_image = image.convert("RGB")
    return transform(rgb_image)

@app.post('/predict')
async def upload_file(file: UploadFile = File(...)):
        
    try:
        image = load_image(await file.read())
        print("file_processed")
        # Processed successfully, return a success response
        
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        # Handle the error and return an error response
    
    # print("file_processing")
    # image = load_image(await file.read())
    # print("file_processsed")
    current_directory = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_directory, "../../model/model_2.pth")
    image_tensor = image.unsqueeze(0)
    model = torch.load(model_path) 
    model.eval()
    prediction = torch.argmax(model(image_tensor), dim=1)
    return {"prediction" : classes[prediction.item()]}


    # return StreamingResponse(BytesIO(image), media_type="image/png")
# 
# async def process_image(file: UploadFile):
    # Read the contents of the uploaded file
    # contents = await file.read()
    # image = Image.open(BytesIO(contents))
    # output = BytesIO()
    # image.save(output, format="PNG")
    # return output.getvalue()
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9000)