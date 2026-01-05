import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play } from "lucide-react";
import { useSoundSettings } from "@/hooks/useSoundSettings";

const SoundSettings = () => {
  const { volume, setVolume, isMuted, setIsMuted } = useSoundSettings();

  const playTestSound = () => {
    if (isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440;
    oscillator.type = "sine";
    gainNode.gain.value = volume * 0.3;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          Sound Settings
        </CardTitle>
        <CardDescription>Control sound effects and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="mute-toggle">Mute Sounds</Label>
            <p className="text-sm text-muted-foreground">Turn off all sound effects</p>
          </div>
          <Switch
            id="mute-toggle"
            checked={isMuted}
            onCheckedChange={setIsMuted}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Volume</Label>
            <span className="text-sm text-muted-foreground">{Math.round(volume * 100)}%</span>
          </div>
          <Slider
            value={[volume]}
            onValueChange={([value]) => setVolume(value)}
            max={1}
            step={0.01}
            disabled={isMuted}
            className="w-full"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={playTestSound}
          disabled={isMuted}
        >
          <Play className="h-4 w-4 mr-2" />
          Test Sound
        </Button>
      </CardContent>
    </Card>
  );
};

export default SoundSettings;
