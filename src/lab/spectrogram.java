import java.awt.image.BufferedImage;
import java.io.PrintStream;

public class Spectrogram
{
  private int nfft;
  private int windowSize;
  private int windowShift;
  private int windowType = 1;
  private double[] data;
  private BufferedImage spectrogram = null;
  
  public Spectrogram(double[] data, int nfft, int windowSize, int windowShift) {
    this.nfft = nfft;
    this.windowSize = windowSize;
    this.windowShift = windowShift;
    this.data = ((double[])data.clone());
  }
  
  public int getWindowType() {
    return windowType;
  }
  
  public void setWindowType(int windowType) {
    this.windowType = windowType;
  }
  
  public BufferedImage getSpectrogram()
  {
    if (spectrogram == null) {
      create();
    }
    
    return spectrogram;
  }
  
  private void create() {
    jfftpack.Complex1D complexfft = new jfftpack.Complex1D();
    jfftpack.RealDoubleFFT fft = new jfftpack.RealDoubleFFT(nfft);
    

    int noFrames = (int)Math.round((data.length - windowSize) / windowShift);
    System.out.format("\nNo of samples %d", new Object[] { Integer.valueOf(data.length) });
    System.out.format("\nwindow size %d", new Object[] { Integer.valueOf(windowSize) });
    System.out.format("\nwindow shift %d", new Object[] { Integer.valueOf(windowShift) });
    int maxVal = 40;int minVal = -120;
    int height = nfft / 2;int width = noFrames;
    
    int[] stftdata = new int[width * height * 3];
    



    int pixelloc = 0;int normalValue = 0;
    signalProcessing.Window stftWindow = new signalProcessing.Window();
    
    System.out.println("Computing spgram");
    for (int frame = 0; frame < noFrames; frame++) {
      double[] windowedData = java.util.Arrays.copyOfRange(data, frame * windowShift, frame * windowShift + windowSize);
      stftWindow.window(windowedData, windowType);
      double[] section = java.util.Arrays.copyOf(windowedData, nfft);
      
      fft.ft(section, complexfft);
      for (int i = 0; i < height; i++)
      {
        double currentVal = 10.0D * Math.log(Math.pow(x[(height - i)], 2.0D) + Math.pow(y[(height - i)], 2.0D));
        stftdata[((width * i + frame) * 3)] = ((int)(Math.min(Math.max(Math.round(currentVal), minVal), maxVal) - minVal));
        stftdata[((width * i + frame) * 3 + 1)] = ((int)(Math.min(Math.max(Math.round(currentVal), minVal), maxVal) - minVal));
        stftdata[((width * i + frame) * 3 + 2)] = ((int)(Math.min(Math.max(Math.round(currentVal), minVal), maxVal) - minVal));
        
        if (normalValue < Math.abs(stftdata[((width * i + frame) * 3)])) {
          normalValue = Math.abs(stftdata[((width * i + frame) * 3)]);
        }
      }
    }
    for (int i = 0; i < stftdata.length; i++) {
      stftdata[i] = (255 - (int)Math.round(255.0D * stftdata[i] / normalValue));
    }
    
    spectrogram = new BufferedImage(width, height, 1);
    java.awt.image.WritableRaster raster = spectrogram.getRaster();
    raster.setPixels(0, 0, width, height, stftdata);
  }
}