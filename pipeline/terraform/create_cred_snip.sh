#!/usr/bin/env bash
set -e

while :
do
    case $1 in
        --mfa-serial=*)
            mfa_serial=${1#*=}
            shift
            ;;
        --profile=*)
            profile=${1#*=}
            shift
            ;;
        --token-code=*)
            token_code=${1#*=}
            shift
            ;;
        --) # End of all options
            shift
            break
            ;;
        -*)
            echo "WARN: Unknown option (ignored): $1" >&2
            shift
            ;;
        *)  # no more options. Stop while loop
            break
            ;;
    esac
done

if [[ -z "$mfa_serial" ]] || [[ -z "$profile" ]] || [[ -z "$token_code" ]]; then
echo "Generate a snippet to be used in ~/.aws/credentials"
echo "Usage:"
echo "./create_cred_snip.sh \
 --mfa-serial='arn:aws:iam::733584830615:mfa/John.Doe'\
 --profile=my_aws_profile_name\
 --token-code=token_code_from_authenticator"
exit 1
fi

if ! jq --version &> /dev/null; then
  echo 'The command `jq` is required to use this script. Install `jq` with your package manager'
  echo '  e.g., `brew install jq` or `apt-get install -y jq`'
  exit 1
fi

json=$(aws sts get-session-token --serial-number="$mfa_serial" --profile="$profile" --token-code="$token_code")

echo "
Add the following to ~/.aws/credentials
######################################
[$profile-mfa]
aws_access_key_id = $(echo "$json" | jq -r '.Credentials.AccessKeyId')
aws_secret_access_key = $(echo "$json" | jq -r '.Credentials.SecretAccessKey')
aws_session_token = $(echo "$json" | jq -r '.Credentials.SessionToken')
"

