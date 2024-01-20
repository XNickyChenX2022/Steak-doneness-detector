# Steak Doneness Classifier
# I.Abstract
Steaks are a global culinary delight, with millions consumed annually. The art of cooking a steak plays a pivotal role in shaping its texture and overall dining experience. Unfortunately, many steaks have met the unfortunate fate of being overcooked beyond redemption. Some, however, have been daringly undercooked but still find their way to the table. Preferences for steak doneness vary widely, yet a significant portion of the global population leans towards the medium-rare spectrum. In an innovative approach, this classifier employs images sourced from quick Google searches and Roboflow to categorize steaks solely based on their visual appearance into six distinct doneness levels: blue rare, rare, medium rare, medium, medium well-done, and well-done.
# II.Introduction
In the course of my life, I've savored numerous steaks, each a delicate balance of perfection when done right—tender and juicy. Yet, there are instances where steaks end up overcooked, resulting in a disappointingly chewy experience. Personally, I align with the medium-rare preference when it comes to steaks. This project stems from my encounters with overcooked steaks, often courtesy of my mother's culinary adventures, and aims to shed light on the nuances of steak correctness. The misconception that medium steak equates to rawness has been a recurring theme, highlighting the need for a more accurate understanding of steak doneness. My own lack of expertise in precisely identifying the doneness of a steak has prompted me to the expertise of online sources. This classifier seeks to harness that collective knowledge to distinguish and categorize steak doneness more effectively than personal assessments might allow. So as a result, an ios app was built using react native to classify the steaks.
# III. Materials and Methods
The majority of the dataset came from state islamic university bandung from roboflow. However, some images were derived from direct google searches. The sum of these two google searches became the dataset for this project. Aside from these images, this classifer did not require any other images. 
# IV. Data Preprocessing
To ensure the proper labeling of steaks, I manually reviewed images to identify incorrectly labeled steaks. I excluded steaks that were challenging to distinguish and those lacking a clear cross-section, as well as images with excessive clutter. Subsequently, I applied image augmentation (flipping the images) to ensure an adequate number of examples. Following the augmentation process, the images were rescaled for training and then divided into training, validation, and test sets. In total, there were 873 steaks to be categorized into three groups. The split was as follows: 80% for training (698 examples), 10% for validation (87 examples), and 10% for testing (88 examples). The division of images into these sets was achieved using scikit-learn's train_test_split method.
Here are some of the images and labels for the steaks. 
![image](https://github.com/XNickyChenX2022/Steak-doneness-detector/assets/115733348/82b685b0-7541-4672-9cba-14bbed622fb4)
Here is the distribution for the steaks. The doneness is from 0 to 5 where 0 is blue rare and 5 is well done.
![image](https://github.com/XNickyChenX2022/Steak-doneness-detector/assets/115733348/09dd4215-677e-4645-a2c7-292853ee0120)
# V. Training and Tuning the model
Initially a CNN (Convolutional Neural Network) was constructed from scratch to train the model. However, it took far too long and did not have enough depth into it. So instead, a new approach was used - transfer learning. Using the Resnet-152 architecture that comes from pytorch as the basis, the model was then finetuned with much trial and error. After finding the optimal epochs (160 epochs) and using SGD (stochastic gradient descent), and then decrementing the learning rate every 80 epochs. The model fit well to both the training and validation set, but more so the training set. The model was stopped before the training set reached 100 percent accurcy as that reduces overfitting to the training set.
Here are the accuracies and the loss values of the training and the validation set. The validation accurcy approaches 92 percent, where as the training set is closer to 97 percent accuracies.
![image](https://github.com/XNickyChenX2022/Steak-doneness-detector/assets/115733348/8beaa85e-42ff-4865-a9a3-5c1ea30057ed)
![image](https://github.com/XNickyChenX2022/Steak-doneness-detector/assets/115733348/69e04e57-11d0-4062-a0e2-7eb69b3486e1)
# VI. Testing the model
It's commendable that the model achieved a test accuracy of approximately 92 percent. However, the acknowledgment of some incorrectly classified images is crucial for refining the model further. Despite these instances, the overall accuracy remains high, and it's noteworthy that the misclassifications were generally within one level of doneness. This indicates a robust performance by the classifier, showcasing its ability to accurately predict the steak's doneness with a high degree of precision. Continued testing and potential adjustments can contribute to further improving the model's accuracy and reliability. Below of some of the steaks that were mislabeled. As one can see, they are all off by one level of doneness.
![image](https://github.com/XNickyChenX2022/Steak-doneness-detector/assets/115733348/481d6a81-2a18-404c-8914-e02381106e36)

# VII. Discussion/ Potential Issues
One noticeable issue is the unequal distribution of steaks, potentially leading the classifier to favor categorizing images as medium/medium rare steaks, achieving accuracy by chance. This could result in difficulties for the classifier in accurately identifying rare and blue rare steaks. Despite this, the classifier successfully identified all rare and blue rare steaks in the test set. Another concern arises from the clarity of images, with higher resolution images providing clearer distinctions compared to pictures obtained from an iOS application. False labeling, especially for steaks between two doneness levels, poses a challenge, as labeling becomes subjective. Additionally, all images are considered steaks, requiring a separate classifier for non-steak images.

# VIII. Full-stack Application
Because the purpose of the steak detector was to use the model, instead of taking pictures and uploading those images onto a pc, I chose to build an ios application using react native. Because I am using a windows computer, react native expo will be used for building this application. The model will be served on fastapi. The api utiilizes the model and determines the doneness of the steak and the ui includes the ability to upload and take pictures of steaks. Because of testing the application required the api to be usuable, the fastapi had to be dockerized and sent to aws ECR. From there the dockerized contained could be deployed onto aws lambda for personal use. At this point, the api can be accessed by my mobile application. Because this application was mainly intended for me and I do not eat steaks that frequently, I did not choose to deploy the frontend. Instead, the application can be used when necessary.

# IX. Closing thoughts
Expanding the dataset with more images and data would likely enhance the model's effectiveness and accuracy. Challenges arose from the lack of ideal datasets featuring perfectly cooked steaks, necessitating the use of online images. The uniqueness of the steak doneness classifier, relying heavily on steak color, makes it less common, and its performance is sensitive to lighting conditions. The absence of actual steak samples impacted the model's accuracy due to varying image quality. Future exploration could involve testing the model with different CNN architectures. Acknowledging that lighting and resolution significantly influence results, it is emphasized that the most accurate method for assessing steak doneness is through temperature measurement.





