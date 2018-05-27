# Image Moderation

Image moderation service. Moderators can approve or reject images in the system, and have access to a dashboard to list and filter images.

Note: This only serves the purposes of development playground, learning and showcasing for myself.

# Setup

1. Install dependencies (python3 + pip + venv)
2. Setup+start virtual environment
3. Update project requirements
4. Run server

### Install Dependencies
```bash
sudo apt-get install python3 python3-dev virtualenv
```
Nice [reference here](https://help.dreamhost.com/hc/en-us/articles/215317948-How-to-install-Django-using-virtualenv).

### Setup and active the python virtualenv.
```bash
# Make sure that your python version is python3!
virtualenv -p python3 /path/to/your/env/
source /path/to/your/env/bin/activate
```
### Update project requirements
```bash
pip install -r requirements.txt
```

### Run server
```bash
./manage.py migrate
./manage.py runserver
```