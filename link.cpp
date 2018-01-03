#include <cstdio>
#include <iostream>
using namespace std;

int main(){
  FILE *fp = fopen("index.html","r");

  char s[256];
  fgets(s,256,fp);
  cout << s << endl;
  fclose(fp);
}

